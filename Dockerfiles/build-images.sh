#!/bin/bash
# Build the BillionMail images from this repository, optionally pushing them.
#
#   Dockerfiles/build-images.sh                 build for this machine, load into docker
#   PUSH=1 Dockerfiles/build-images.sh          build linux/amd64 + linux/arm64, push to the registry
#   Dockerfiles/build-images.sh core webmail    only the listed images
#
# Image names and tags come from docker-compose.yml, so bump them there.
# Pushing to ghcr.io needs `docker login ghcr.io` with a token that has write:packages.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "${ROOT}"

PUSH=${PUSH:-0}
if [ "${PUSH}" = "1" ]; then
    PLATFORMS=${PLATFORMS:-linux/amd64,linux/arm64}
else
    PLATFORMS=${PLATFORMS:-linux/$(docker version --format '{{.Server.Arch}}')}
fi
GO_IMAGE=golang:1.26.5-alpine

# service name -> image reference, e.g. core -> ghcr.io/loongyearmeta/mail-core:1.0.0
declare -A IMAGES
while read -r ref; do
    name=${ref##*/mail-}
    IMAGES[${name%%:*}]=${ref}
done < <(grep -oE 'image: ghcr\.io/[^ ]+/mail-[a-z]+:[^ ]+' docker-compose.yml | awk '{print $2}')

SERVICES=("$@")
[ ${#SERVICES[@]} -eq 0 ] && SERVICES=(core webmail dovecot postfix rspamd)

if [ "${PUSH}" = "1" ] || [[ "${PLATFORMS}" == *,* ]]; then
    # Multi-platform builds need a docker-container builder (and QEMU for foreign arches).
    docker buildx inspect billionmail-builder >/dev/null 2>&1 \
        || docker buildx create --name billionmail-builder --driver docker-container >/dev/null
    BUILDER=(--builder billionmail-builder)
    OUTPUT=(--push)
    [ "${PUSH}" = "1" ] || { echo "Multi-platform builds can only be pushed, set PUSH=1"; exit 1; }
else
    BUILDER=()
    OUTPUT=(--load)
fi

# core: the Dockerfile packs a prebuilt binary per architecture plus the committed frontend dist.
prepare_core() {
    local ctx=$1
    mkdir -p "${ctx}/core"
    cp Dockerfiles/core/* "${ctx}/"
    cp -r core/manifest core/languages core/public core/resource core/template "${ctx}/core/"
    for platform in ${PLATFORMS//,/ }; do
        local arch=${platform#linux/}
        echo ">> Building core binary for ${arch}"
        docker run --rm -v "${ROOT}/core":/src -w /src -v "${ctx}/core":/out \
            -v billionmail-gomod:/go/pkg/mod -v billionmail-gocache:/root/.cache/go-build \
            -e CGO_ENABLED=0 -e GOOS=linux -e GOARCH="${arch}" "${GO_IMAGE}" \
            sh -c "go build -trimpath -ldflags '-s -w' -o /out/billionmail-${arch} main.go && chown $(id -u):$(id -g) /out/billionmail-${arch}"
    done
}

for svc in "${SERVICES[@]}"; do
    ref=${IMAGES[${svc}]:-}
    [ -n "${ref}" ] || { echo "No ghcr.io image for '${svc}' in docker-compose.yml"; exit 1; }

    ctx="Dockerfiles/${svc}"
    if [ "${svc}" = "core" ]; then
        CORE_CTX=$(mktemp -d)
        trap 'rm -rf "${CORE_CTX}"' EXIT
        prepare_core "${CORE_CTX}"
        ctx=${CORE_CTX}
    fi

    echo ">> Building ${ref} (${PLATFORMS})"
    docker buildx build "${BUILDER[@]}" --platform "${PLATFORMS}" -t "${ref}" "${OUTPUT[@]}" "${ctx}"
done

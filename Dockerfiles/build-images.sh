#!/bin/bash
# Build the BillionMail images from this repository, optionally pushing them.
#
#   Dockerfiles/build-images.sh                 build linux/amd64, load into docker
#   PUSH=1 Dockerfiles/build-images.sh          build linux/amd64, push to the registry
#   Dockerfiles/build-images.sh core webmail    only the listed images
#   PLATFORMS=linux/amd64,linux/arm64 PUSH=1 …  multi-platform (needs QEMU for foreign arches)
#
# Image names and tags come from docker-compose.yml, so bump them there.
# Pushing to ghcr.io needs `docker login ghcr.io` with a token that has write:packages.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "${ROOT}"

PUSH=${PUSH:-0}
# Production hosts are amd64
PLATFORMS=${PLATFORMS:-linux/amd64}
GO_IMAGE=golang:1.26.5-alpine

# service name -> image reference, e.g. core -> ghcr.io/loongyearmeta/mail-core:1.0.0
declare -A IMAGES
while read -r ref; do
    name=${ref##*/mail-}
    IMAGES[${name%%:*}]=${ref}
done < <(grep -oE 'image: ghcr\.io/[^ ]+/mail-[a-z]+:[^ ]+' docker-compose.yml | awk '{print $2}')

SERVICES=("$@")
[ ${#SERVICES[@]} -eq 0 ] && SERVICES=(core webmail dovecot postfix rspamd)

BUILDER=()
OUTPUT=(--load)
[ "${PUSH}" = "1" ] && OUTPUT=(--push)
if [[ "${PLATFORMS}" == *,* ]]; then
    # Multi-platform builds need a docker-container builder and can only be pushed.
    [ "${PUSH}" = "1" ] || { echo "Multi-platform builds can only be pushed, set PUSH=1"; exit 1; }
    docker buildx inspect billionmail-builder >/dev/null 2>&1 \
        || docker buildx create --name billionmail-builder --driver docker-container >/dev/null
    BUILDER=(--builder billionmail-builder)
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

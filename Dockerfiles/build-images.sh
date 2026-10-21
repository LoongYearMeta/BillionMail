#!/bin/bash
# Build the BillionMail images (linux/amd64) from this repository, optionally pushing them.
#
#   Dockerfiles/build-images.sh                 build all images
#   Dockerfiles/build-images.sh core webmail    only the listed images
#   PUSH=1 Dockerfiles/build-images.sh          build and push to the registry
#
# Image names and tags come from docker-compose.yml, so bump them there.
# Pushing to ghcr.io needs `docker login ghcr.io` with a token that has write:packages.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "${ROOT}"

# service name -> image reference, e.g. core -> ghcr.io/loongyearmeta/mail-core:1.0.0
declare -A IMAGES
while read -r ref; do
    name=${ref##*/mail-}
    IMAGES[${name%%:*}]=${ref}
done < <(grep -oE 'image: ghcr\.io/[^ ]+/mail-[a-z]+:[^ ]+' docker-compose.yml | awk '{print $2}')

SERVICES=("$@")
[ ${#SERVICES[@]} -eq 0 ] && SERVICES=(core webmail dovecot postfix rspamd)

# core: the Dockerfile packs the prebuilt binary plus the committed frontend dist.
prepare_core() {
    local ctx=$1
    mkdir -p "${ctx}/core"
    cp Dockerfiles/core/* "${ctx}/"
    cp -r core/manifest core/languages core/public core/resource core/template "${ctx}/core/"
    echo ">> Building core binary"
    docker run --rm -v "${ROOT}/core":/src -w /src -v "${ctx}/core":/out \
        -v billionmail-gomod:/go/pkg/mod -v billionmail-gocache:/root/.cache/go-build \
        -e CGO_ENABLED=0 -e GOOS=linux -e GOARCH=amd64 golang:1.26.5-alpine \
        sh -c "go build -trimpath -ldflags '-s -w' -o /out/billionmail main.go && chown $(id -u):$(id -g) /out/billionmail"
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

    echo ">> Building ${ref}"
    docker build --platform linux/amd64 -t "${ref}" "${ctx}"
    if [ "${PUSH:-0}" = "1" ]; then
        docker push "${ref}"
    fi
done

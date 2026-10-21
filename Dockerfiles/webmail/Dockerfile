FROM golang:1.26.5-alpine AS build

# alps webmail (https://github.com/migadu/alps), pinned to a reviewed commit.
# The frontend is prebuilt in the repository and embedded via go:embed.
ARG ALPS_COMMIT=2bfdd59bc79ccf363c1209ac69775ae7c8f25f41

RUN apk add --no-cache git
WORKDIR /src
RUN git init -q . \
    && git remote add origin https://github.com/migadu/alps.git \
    && git fetch -q --depth 1 origin ${ALPS_COMMIT} \
    && git checkout -q FETCH_HEAD
RUN CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" -o /out/alps ./cmd/alps


FROM alpine:3.22

LABEL maintainer="https://github.com/LoongYearMeta/BillionMail"

RUN apk add --no-cache ca-certificates tzdata \
    && adduser -D -H -u 1323 alps \
    && mkdir -p /etc/alps /tmp/alps \
    && chown alps:alps /etc/alps /tmp/alps

COPY --from=build /out/alps /usr/local/bin/alps
COPY webmail.sh /webmail.sh
RUN chmod +x /webmail.sh

USER alps
EXPOSE 1323

ENTRYPOINT ["/webmail.sh"]

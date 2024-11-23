# 5danauoblacima2024

## Prerequisites

### Container (recommended)

- [Docker](https://docs.docker.com/engine/install/), alternatively use [Podman](https://podman.io/docs/installation)

### Local

- [nodejs](https://nodejs.org/en/download)

## Build

### Container (recommended)

- Run `make docker-build` or `make podman-build` to build the Dockerfile
- Afterwards to start run `make docker-start` or `make podman-start`

### Local

1. Install modules with `make install`
1. Run dev server with `pnpm run dev`
1. Alternatively build project with `pnpm run build` and run it with `pnpm run start`

## Access (both methods)

1. API should be available under port `8080`, you can check by going to `http://localhost:8080/healthz`

## Tests (automated)

- To run the audomated tests you must do `Local` setup after which you can start the tests with `pnpm run test`

## Technologies

- NodeJS - [JavaScript runtime for servers](https://nodejs.org)
- PNPM - [Fast, disk space efficient package manager](https://pnpm.io/), used to install required packages
- Fastify - [Fast and low overhead web framework](https://fastify.dev/) for NodeJS
- Docker - [Containerized packaging](https://docs.docker.com/get-started/overview/)

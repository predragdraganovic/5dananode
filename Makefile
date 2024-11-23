podman-build:
	podman build . --tag 5danauoblacima2024:latest

docker-build:
	docker build . --tag 5danauoblacima2024:latest

podman-start:
	podman run --rm -p 8080:8080 5danauoblacima2024:latest

docker-start:
	docker run --rm -p 8080:8080 5danauoblacima2024:latest

install:
	pnpm i --frozen-lockfile
.PHONY: build-development
build-development: ## Build the development docker image.
	docker compose -f docker/development/docker-compose.yml --env-file ./.env build

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker/development/docker-compose.yml --env-file ./.env up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker/development/docker-compose.yml down
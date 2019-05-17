start: up
stop: clean
restart: stop start
rebuild: stop build
rebuild-clean: super-clean rebuild

clean:
	docker-compose rm --force --stop -v

super-clean: clean
	docker system prune --all --force --volumes

build: clean docker-build install

docker-build:
	docker-compose build

docker-build-no-cache:
	docker-compose build --pull --no-cache

install:
	docker-compose run --rm buildchain npm install

up:
	docker-compose up --force-recreate

web-sh:
	docker-compose run --rm web sh

web-bash:
	docker-compose run --rm web bash

.PHONY: conf craft scripts site sql

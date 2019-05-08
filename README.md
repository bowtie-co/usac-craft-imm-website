# README #


### What is this repository for? ###

* This repo will let you run the USAC Craft site locally in Docker

### How do I get set up? ###

* Install Docker
* Create the `.dev.env` from `example.dev.env`. Change `MYSQL_HOST` to `localhost`
* Run `docker-compose build` on the repo
* Once it builds, obtain a db dump from the sysadmin and import into the usa_cycling_uat table
* Run `docker-compose up`
* Site will be available at http://usac.localhost/
<!--
### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact -->

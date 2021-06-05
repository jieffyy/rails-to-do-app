# Rails Task Management Application

![Server - Tests](https://github.com/lowjiefeng1998/rails-to-do-app/actions/workflows/main.yml/badge.svg)

## Setup

### Current Development Version

### Setup

#### Ruby

1. Setup rbenv using this [guide](https://github.com/rbenv/rbenv#installation).
1. Ensure that rbenv has the Ruby version as stated in `.ruby-version`.
1. Set the local Ruby version using `rbenv local <version>`.

#### Ruby Gems (including Rails)

1. Enter the `server/` directory by running by `cd server/`.
1. Run `bundle install`.

#### Docker - for the Database

1. Ensure you have [Docker Compose](https://www.docker.com/products/docker-desktop) on your computer.
   > Docker for Windows might get tricky to setup. \
   > You will need WSL2.
1. Run `docker-compose up`.

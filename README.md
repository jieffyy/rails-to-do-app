# Rails Task Management Application

## Setup

_Written as of 26 Jan 2021, developed on Windows with WSL2_

### Current Development Version

Ruby: 3.0.0
Rails: 6.1.1

### Setup

#### Ruby

1. Setup rbenv using this [link](https://github.com/rbenv/rbenv#installation).
1. Ensure that rbenv has the Ruby version as stated in `.ruby-version`.
1. Set the local Ruby version using `rbenv local <version>`.

#### Rails and Ruby Gems

1. Run 'gem install rails -v 6.1.1`.
1. Enter the `server/` directory by running by `cd server/`.
1. Run `bundle install`.

#### Docker - for the Database

1. Ensure you have [Docker Compose](https://www.docker.com/products/docker-desktop) on your computer.
   > Docker for Windows might get tricky to setup.
   > You will need WSL2 (which means you need a preview version of Windows).
1. Run `docker-compose -f development.yml up`.

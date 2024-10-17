# API

## Command to run after Setup

```
yarn dev:db:migrate # initialize the database
yarn dev:db:seed # add a dummy John Doe user to the database
yarn dev # start the server
```

## Setup

### Install Homebrew

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Setting up node

Use [using NVM](https://github.com/nvm-sh/nvm) as the node version manager. We are using Node version 18+. Run this

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Then run, for installing node 20.

```
nvm install 20
```

If you're using a new laptop with zsh, you might have to add nvm commands to zsh.

```
touch ~/.zshrc
vim ~/.zshrc
```

Then add this

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### Setting up yarn

[Follow this guide](https://yarnpkg.com/getting-started/install) to install yarn. Run

```
npm install -g yarn
```

### Installing Postgres via homebrew

Install postgres 16

```
brew install postgresql@16
```

Run postgresql with brew:

```
brew services start postgresql@16
```

Verify postgres is running

```
brew services list
```

### Upgrading Postgres

- Follow this [guide](https://www.moncefbelyamani.com/how-to-upgrade-postgresql-with-homebrew/) whenever upgrading postgres version
- navigate to doppler and update the relevant database URL environment variables

### Setting up postgres user

When postgresql is installed, it has your computer username as the primary user, not the standard `postgres` user. You have to add the `postgres` user yourself. Run:

If `psql` command does not work, make sure that the `PATH` was updated in `~/.zshrc` to include postgres@15. If it does include it and `psql` still doesn't work, restart the terminal.

```
psql postgres
```

Then run

```sql
CREATE ROLE postgres WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD postgres;
```

Verify by running to see all the users

```
\du
```

Create 2 new databases with these precise names, and make sure to assign ownership to `postgres` user they you created earlier:

```
CREATE DATABASE shepherd_pre_onboarding_challenge;
ALTER DATABASE shepherd_pre_onboarding_challenge OWNER TO postgres;

```

Then quit with

```
\q
```

### Setting up Prisma

Update `url` in `prisma/schema.prisma` to be the following:

```
url      = env("postgres://postgres:postgres@127.0.0.1:5432/shepherd_pre_onboarding_challenge")
```

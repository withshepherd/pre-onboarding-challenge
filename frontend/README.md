# Client

## Command to run after Setup

```
yarn install # install dependencies
yarn graphql:generate # generate graphql types and callers, this is create new files
yarn dev # start nextjs server
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

### Run the app

```
yarn dev
```

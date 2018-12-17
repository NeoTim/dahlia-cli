# dahlia-cli

> CLI tool for Dahlia

<!-- toc -->
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

## Installation

```sh-session
$ yarn install -g dahlia-cli
```

## Usage

```sh-session
$ yarn global add dahlia-cli
$ dh new my-app
$ cd my-app
$ dh dev
```

## Commands

### `dh help`

```bash
CLI tool for Dahlia

VERSION
  dahlia-cli/0.0.0 darwin-x64 node-v10.9.0

USAGE
  $ dahlia [COMMAND]

COMMANDS
  generate  Generate page/component/store...
  help      display help for dahlia
  new       Create a new Dahlia app
```

### `dh new`

Create a new Dahlia app

```
Create a new Dahlia app

USAGE
  $ dahlia new [APPNAME]

ALIASES
  $ dahlia n

EXAMPLE
  $ dh new my-app
```


### `dh generate`

Generate page/component/store...

```
USAGE
  $ dahlia generate [TYPE] [NAME]

ALIASES
  $ dahlia g

EXAMPLES
  $ dh generate page Home
  $ dh generate component Header
  $ dh generate store todoStore
```

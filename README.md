# dahlia-cli

> CLI tool for Dahlia

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [dh help](#dh-help)
  - [dh new](#dh-new)
  - [dh generate](#dh-generate)
  - [dh start](#dh-start)
  - [dh test](#dh-test)
  - [dh build](#dh-build)
  - [dh eject](#dh-eject)

## Installation

```sh-session
$ yarn install -g dahlia-cli
```

## Usage

```sh-session
$ yarn global add dahlia-cli
$ dh new my-app
$ cd my-app
$ dh start
```

## Commands

### `dh help`

```bash
CLI tool for Dahlia

VERSION
  dahlia-cli/1.0.0 darwin-x64 node-v10.9.0

USAGE
  $ dahlia [COMMAND]

COMMANDS
  build     Build project for production
  dev       Run a dev server for development
  eject     Expose all configurations to customize
  generate  Generate page/component/store...
  help      display help for dahlia
  new       Create a new Dahlia app
  test      Runs unit tests in project
```

### `dh new`

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

```
Generate page/component/store...

USAGE
  $ dahlia generate [TYPE] [NAME]

ALIASES
  $ dahlia g

EXAMPLES
  $ dh generate page Home
  $ dh generate component Header
  $ dh generate store todoStore
```

### `dh start`

```
Run a dev server for development

USAGE
  $ dahlia dev

ALIASES
  $ dahlia d

EXAMPLE
  $ dh start
```

### `dh test`

```
Runs unit tests in project

USAGE
  $ dahlia test

ALIASES
  $ dahlia t

EXAMPLE
  $ dh test
```

### `dh build`

```
Build project for production

USAGE
  $ dahlia build

ALIASES
  $ dahlia b

EXAMPLE
  $ dh build
```

### `dh eject`

```
Expose all configurations to customize

USAGE
  $ dahlia eject

ALIASES
  $ dahlia e

EXAMPLE
  $ dh eject
```

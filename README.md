dahlia-cli
==========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dahlia-cli.svg)](https://npmjs.org/package/dahlia-cli)
[![Downloads/week](https://img.shields.io/npm/dw/dahlia-cli.svg)](https://npmjs.org/package/dahlia-cli)
[![License](https://img.shields.io/npm/l/dahlia-cli.svg)](https://github.com/forsigner/dahlia-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dahlia-cli
$ dahlia COMMAND
running command...
$ dahlia (-v|--version|version)
dahlia-cli/0.0.0 darwin-x64 node-v10.9.0
$ dahlia --help [COMMAND]
USAGE
  $ dahlia COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dahlia hello [FILE]`](#dahlia-hello-file)
* [`dahlia help [COMMAND]`](#dahlia-help-command)

## `dahlia hello [FILE]`

describe the command here

```
USAGE
  $ dahlia hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ dahlia hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/forsigner/dahlia-cli/blob/v0.0.0/src/commands/hello.ts)_

## `dahlia help [COMMAND]`

display help for dahlia

```
USAGE
  $ dahlia help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_
<!-- commandsstop -->

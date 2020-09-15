[![npm
version](https://badge.fury.io/js/get-clean-port.svg)](https://badge.fury.io/js/get-clean-port)

# get-clean-port

BEFORE get-clean-port:

```sh
# Project 1
$ next -p 3004

# Project 2
$ gatsby develop -p 3005

# Project 3
$ node expressapp.js -p 3006

# A week later, starting a new project...
# Project 4
# Did I already use port 3005? Or was the next one 3006?
$ ./koaapp.js --port 3006 # oops!

# Open another terminal, want to run second instance, up arrow + enter, and...
$ ./koaapp.js --port 3006 # guaranteed EADDRINUSE!
```

AFTER get-clean-port:

```sh
# Install gcp in your path
$ npm install -g get-clean-port

# Project 1
$ next -p `get-clean-port proj1` # port A

# Project 2
$ gatsby develop -p `gcp proj2` # port B (`gcp` is synonymous w/ get-clean-port)

# Project 3
$ node expressapp.js -p `npx -q get-clean-port p3` # Or don't install gcp at all

# A week later, starting a new project...
# Project 4
$ ./koaapp.js --port `gcp project-4` # port D

# Close the project... come back to it a few weeks later
$ ./koaapp.js --port `gcp project-4` # port D (same port as before)

# And in another window, we want to start another dev instance without problems
$ ./koaapp.js --port `gcp project-4` # will run on the next available port

# You don't even need an id. Call gcp by itself and it'll use the directory name
# as the id automatically. Easy peasy!
$ cd ~/repos/freelance/shiny-new-react-app
$ npm run dev -p `gcp` # same as: $ npm run dev -p `gcp shiny-new-react-app`
```

`get-clean-port` takes in an identifier (`id`) and spits out a mapped port
number. Hence, subsequent calls using the same `id` will get the same port
number again and again. The only exception is when the originally mapped port is
being used by another process, in which case `get-clean-port` temporarily
returns the next least unused port number using
[detect-port](https://github.com/node-modules/detect-port). Once the originally
mapped port is no longer in use, later calls with the same `id` will return it.

Port numbers start at 3000. You can change/delete your port mappings and/or
choose the next starting port in the `_portmap.json` configuration file found at
`~/.config/_portmap.json`.

This is useful if, like me, you're running any dozen dev servers off the same
rig and like to have consistent port numbers for your projects with the added
flexibility of temporary port assignments when necessary. I use it in my
`package.json` files, composer scripts, shell scripts, and other places like so:

```json
{
    ...
    "scripts": {
        "dev": "next -p `gcp`"
    }
}
```

Or with NPX, so users who don't have get-clean-port installed globally can still
call `npm run dev` without an issue:

```json
{
    ...
    "scripts": {
        "dev": "next -p `npx -q get-clean-port`"
    }
}
```

> Note: using NPX will add overhead to your program's start time. To make `npx
> -q get-clean-port` return instantaneously, ensure `get-clean-port` is
> installed globally.

## Installation and Usage

```sh
$ npm install -g get-clean-port
$ get-clean-port ident
$ gcp ident
$ gcp
```

This tool can also be used via NPX without installing anything:

```sh
$ echo `npx get-clean-port ident`
```

Though, this will add a few seconds to your program's start time. To avoid this,
ensure `get-clean-port` is installed globally.

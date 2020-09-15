[![npm
version](https://badge.fury.io/js/acquire-port.svg)](https://badge.fury.io/js/acquire-port)

# acquire-port

BEFORE acquire-port:

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
$ ./koaapp.js --port 3006 # Oops!

# Open another terminal, want to run second instance, up arrow + enter, and...
$ ./koaapp.js --port 3006 # Guaranteed EADDRINUSE!
```

AFTER acquire-port:

```sh
# Optional: install acquire-port in your path
$ npm install -g acquire-port

# Project 1
$ next -p `acquire-port proj1` # Port A

# Project 2
$ gatsby develop -p `ap proj2` # Port B
# `ap` is synonymous with `acquire-port`!

# Project 3
$ node expressapp.js -p `npx -q acquire-port p3` # Or don't install acquire-port at all

# A week later, starting a new project...
# Project 4
$ ./koaapp.js --port `ap project-4` # Port D

# Close the project... come back to it a few weeks later
$ ./koaapp.js --port `ap project-4` # Port D (same port as before)

# And in another window, we want to start another dev instance without problems
$ ./koaapp.js --port `ap project-4` # Will run on the next available port temporarily

# You don't even need an id. Call acquire-port by itself and it'll use the directory name
# as the id automatically. Easy peasy!
$ cd ~/repos/freelance/shiny-new-react-app
$ npm run dev -p `ap`
# Same as: npm run dev -p `acquire-port shiny-new-react-app`
```

`acquire-port` takes in an identifier (`id`) and spits out a mapped port number.
Subsequent calls using the same `id` will get the same port number again and
again. The only exception is when the originally mapped port is being used by
another process, in which case `acquire-port` temporarily returns the next least
unused port using [detect-port](https://github.com/node-modules/detect-port).
Once the originally mapped port is no longer in use, later calls with the same
`id` will return it.

Port numbers start at 3000. You can change/delete your port mappings and/or
choose the next starting port in the `_portmap.json` configuration file found at
`~/.config/_portmap.json`.

This is useful if, like me, you're running any dozen dev servers off the same
rig simultaneously and like to have consistent port numbers for your projects
with the added flexibility of temporary port assignments when necessary. I use
it in my `package.json` files, composer scripts, shell scripts, and other places
like so:

```json
{
    ...
    "scripts": {
        "dev": "next -p `acquire-port`"
    }
}
```

Or with npx, so users who don't have acquire-port installed globally can still
call `npm run dev` without an issue:

```json
{
    ...
    "scripts": {
        "dev": "next -p `npx -q acquire-port`"
    }
}
```

> Note: using npx might add overhead to your program's start time. To make `npx
> -q acquire-port` return instantaneously, ensure `acquire-port` is installed
> globally.

## Installation and Usage

```sh
$ npm install -g acquire-port
$ acquire-port ident
$ port ident
$ port
```

This tool can also be used via npx without installing anything:

```sh
$ echo `npx acquire-port ident`
```

Though, this will add a few seconds to your program's start time. To avoid this,
ensure `acquire-port` is installed globally.

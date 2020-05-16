#!/usr/bin/env node

// * Generates consistent free port numbers for my projects without me having to
// * remember them!

const json = require('jsonfile');
const basename = require('basename');
const detect = require('detect-port');
const os = require('os');

const MIN_PORT = 3000;
const PORTMAP_PATH = `${os.homedir()}/.config/_portmap.json`;

(async () => {
    let portmap = null;

    if(![2, 3].includes(process.argv.length)) {
        console.log(`usage: ${basename(__filename)} [identifier]`);
        process.exit(1);
    }

    if(process.argv.length != 3)
        process.argv[2] = basename(process.cwd());

    try {
        portmap = await json.readFile(PORTMAP_PATH);
    }

    catch(ignored){}

    try {
        if(!portmap) {
            portmap = { nextPort: MIN_PORT, ports: {} };
            await json.writeFile(PORTMAP_PATH, portmap);
        }

        const id = process.argv[2];
        const idExists = id in portmap.ports;
        const port = await detect(idExists ? portmap.ports[id] : portmap.nextPort);

        if(!idExists) {
            portmap.ports[id] = port;
            portmap.nextPort = port + 1;
            await json.writeFile(PORTMAP_PATH, portmap);
        }

        console.log(port);
    }

    catch(error) {
        console.log(`FATAL ERROR: ${error}`);
        process.exit(2);
    }
})();

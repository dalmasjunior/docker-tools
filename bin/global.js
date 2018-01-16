#!/usr/bin/env node
const hello = require('../lib/hello');
const help = require('../lib/help');
const config = require('../lib/config');
const list = require('../lib/list');

var args = process.argv.splice(process.execArgv.length + 2);
// if (process.platform == 'linux') {
if (process.platform == 'win32') {
    list.updateList();
    switch (args[0]) {
        case "--help":
            help();
            break;
        case "config":
            config(args.slice(1,args.length));
            break;
        case "list":
            list.showList(args.slice(1,args.length));
        case undefined:
            hello();
            break;    
        default:
            break;
    }
} else {
    console.log("\x1b[31m%s\x1b[0m", "Warning!");
    console.log("\x1b[33m%s\x1b[0m", "This module works only in linux based systems!")    
}
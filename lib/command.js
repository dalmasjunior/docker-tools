const { spawn } = require('child_process');
const config = require('./config');

class Command {

    getContainer(param) {
        return config(["GET", "CONTAINERS", params[0]]);
    }

    start(params) {
        var container = this.getContainer(params);
        var command = spawn('docker',['start', container.name]);

        command.stdout.on('data', (data) => {
            console.log('Container \x1b[32m' + container.name + '\x1b[0m has been started');
        });

        command.stderr.on('data', (data) => {
            console.log('Error initializing the \x1b[31m' + container.name + "\x1b[0m container.");
        })
    };

    stop(params) {
        var container = this.getContainer(params);
        var command = spawn('docker',['stop', container.name]);

        command.stdout.on('data', (data) => {
            console.log('Container \x1b[32m' + container.name + '\x1b[0m has been stoped');
        });

        command.stderr.on('data', (data) => {
            console.log('Error stopping the \x1b[31m' + container.name + "\x1b[0m container.");
        })
    }

    rm(params) {
        var container = this.getContainer(params);
        var command = spawn('docker',['rm', container.name]);

        command.stdout.on('data', (data) => {
            console.log('Container \x1b[32m' + container.name + '\x1b[0m has been removed');
        });

        command.stderr.on('data', (data) => {
            console.log('Error removing the \x1b[31m' + container.name + "\x1b[0m container.");
        })
    }

    rmi(params) {
        var container = this.getContainer(params);
        var command = spawn('docker',['rmi', container.image]);

        command.stdout.on('data', (data) => {
            console.log('Image \x1b[32m' + container.image + '\x1b[0m has been removed');
        });

        command.stderr.on('data', (data) => {
            console.log('Error removing the \x1b[31m' + container.image + "\x1b[0m container.");
        })
    }
}

module.exports = new Command;
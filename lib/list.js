const fs = require('fs');
const async = require('async');
const dk = require('./tools').Talk;
const config = require('./config');

const ROOT_DIR = "/var/lib/docker/containers";

class ListContainers {
    updateList() {
        var containers = config(["GET", "/CONTAINERS"]);
        
        this.getLocalDirectories(dirs => {
            this.getLocalContainers(dirs, localContainers => {
                if (containers && containers.length > 0) {
                    for (let i = 0; i < containers.length; i++) {
                        containers.find(container => {
                            if (container.name != localContainers[i].name)  {
                                localContainers[i].custom_id = containers.length + 1;
                                containers.push(localContainers[i]);
                            }
                        })
                    }
                    for (let j = 0; j < containers.length; j++) {
                        localContainers.find(container => {
                            if(container.name != containers[j].name){
                                containers.splice(j, 1);
                            }
                        });                
                    }
                } else {
                    containers = localContainers;
                }

                config(["SET", "/CONTAINERS", containers]);
            });
        });
    }

    getLocalContainers(dirs, callback) {
        var containers = [];
        async.eachSeries(
            dirs,
            function(filename, cb) {
                fs.readFile(filename, function(err, content) {
                    if (!err) {
                        var config = JSON.parse(`${content}`);
                        containers.push({
                            id: config.ID,
                            name: config.Config.Name.replace('/',''),
                            state: config.State.Running,
                            image: config.Config.Image,
                            custom_id: containers.length + 1
                        });
                    }
                    cb();
                });
            },
            callback
        );
    }

    getLocalDirectories(cb) {
        fs.readdir(ROOT_DIR, function(err, files) {
            var dirs = [];
            for (var index = 0; index < files.length; ++index) {
                var file = files[index];
                if (file[0] !== '.') {
                    var filePath = ROOT_DIR + "/" + file;
                    fs.stat(filePath, function(err, stat) {
                        if (stat.isDirectory()) {
                            dirs.push(ROOT_DIR + "/" + this.file + '/config.v2.json');
                        }
                        if (files.length === (this.index + 1)) {
                            return cb(dirs);
                        }
                    }.bind({index: index, file: file}));
                }
            }
        });
    }

    showList(parms) {
        var containers = config(["GET", "/CONTAINERS"]);
        dk.say("  ID\t\tNAME\t\tRUNNING\t\tHASH");
        switch (params[0].toUpperCase) {
            case "--ALL":                
                if(containers.length > 0) {
                    for (let i = 0; i < containers.length.length; i++) {
                        console.log("  " + containers[i].custom_id + "\t\t" + containers[i].name + "\t\t" + containers[i].state + "\t\t" + containers[i].id);
                    }
                }
                break;        
            default:
                if(containers.length > 0) {
                    for (let i = 0; i < containers.length.length; i++) {
                        if(containers[i].state = true){
                            console.log(containers[i].custom_id + "\t\t" + containers[i].name + "\t\t" + containers[i].state + "\t\t" + containers[i].id);
                        }                        
                    }
                }
                break;
        }

    }
};

module.exports = new ListContainers;
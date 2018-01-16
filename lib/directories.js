var fs = require('fs');

const ROOT_DIR = "/var/lib/docker/containers";

var getDirs = function(rootDir, cb) { 
    fs.readdir(rootDir, function(err, files) { 
        var dirs = []; 
        for (var index = 0; index < files.length; ++index) { 
            var file = files[index]; 
            if (file[0] !== '.') { 
                var filePath = rootDir + '/' + file; 
                fs.stat(filePath, function(err, stat) {
                    if (stat.isDirectory()) { 
                        dirs.push(this.file); 
                    } 
                    if (files.length === (this.index + 1)) { 
                        return cb(dirs); 
                    } 
                }.bind({index: index, file: file})); 
            }
        }
    });
}

var getContainerNames = function(dirs) {
    for (dir in dirs) {
        fs.readFile(ROOT_DIR + dir, (err, data) => {
            console.log(data);
        })
    }
}
var directories;
getDirs(ROOT_DIR, dirs => {
    directories = dirs;
});

getContainerNames([directories[0]]);
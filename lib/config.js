const hash = require('password-hash');
const dk = require('./tools').Talk;
const db = require('./db');

var config = function(params) {
    switch (params[0].toUpperCase()) {
        case "SET":
            setConfig(params.slice(1,params.length));
            break;
        case "GET":
            getConfig(params.slice(1,params.length));
            break;
        case "DELETE":
            db.resetParam(params[1]);
            break;
        default:
            break;
    }
}

var setConfig = function(params) {
    switch (params[0].toUpperCase()) {
        case "IMAGE":
            setImage(params[1], params[2]);
            break;
        default:
            break;
    }
}
var getConfig = function(params) {
    switch (params[0].toUpperCase()) {
        case "IMAGE":
            getImage(params[1]);
            break;    
        case "CONTAINERS":
            getContainers(params.slice(1,params.length))
        default:
            break;
    }
}

var setImage = function(container, source){
    db.setValue(container, source);
}

var getContainers = function(params) {
    if (parseInt(params[0])) {
        getContainerById(parseInt(params[0]));
    } else if (hash.isHashed(params[0])) {
        getContainerByHash(params[0]);
    } else if (typeof params[0] === 'string') {
        getContainerByName(params[0]);
    }
}

var getImage = function(container) {
    return db.getValue(container);
}

var getContainerById = function(id) {
    let containers = db.getValue('/CONTAINERS');
    return containers.find(container => {
        return container.custom_id == id;
    });
}

var getContainerByHash = function(hash) {
    let containers = db.getValue('/CONTAINERS');
    return containers.find(container => {
        return container.id == hash;
    });
}

var getContainerByName = function(name) {
    let containers = db.getValue('/CONTAINERS');
    return containers.find(container => {
        return container.name == name;
    });
}

module.exports = config;
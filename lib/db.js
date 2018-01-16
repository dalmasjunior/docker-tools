const path = require('path');
var DB = require('node-json-db');

const db = new DB("configDB", true, false); 

class DataBase {
    setValue(param, value) {
        db.push(param, value);
    }

    getValue(param) {
        var data = db.getData('/');
        return data[param];
    }

    resetParam(param) {
        db.delete(param);
    }
}

module.exports = new DataBase;
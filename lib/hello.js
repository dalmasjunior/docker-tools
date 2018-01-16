const dk = require('./tools').Talk;

hello = function() {
    dk.say("  \x1b[32mWelcome to DockerTools BETA!!\x1b[0m");
    dk.say("  This module was created to improve your experience with Docker Containers.");
    dk.say("  \x1b[31mWARNING\x1b[0m : If you don't have Docker installed, please, access https://docker.com and intall now!");
    dk.say("  If this is your first time with DockerTools, access my documentation and learn how to configure dk properly!")
    dk.say("  See below the our commands. For commands and their descriptions, please, use the 'dk --help' command!\n");
    dk.say("  build");
    dk.say("  config");
    dk.say("  list");
    dk.say("  rebuild");
    dk.say("  rm");
    dk.say("  rmi");
    dk.say("  start");
    dk.say("  stop");
};

module.exports = hello;
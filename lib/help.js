const dk = require('./tools').Talk;

help = function() {
    dk.say("  Commands          -           Description");
    dk.say("    build                           Build a new image");
    dk.say("    config                          List/Set/Remove params");
    dk.say("    list                            List all containers");
    dk.say("    rebuild                         Rebuild a container image");
    dk.say("    rm                              Remove a container");
    dk.say("    rmi                             Remove an image");
    dk.say("    start                           Start a container");
    dk.say("    stop                            Stop a container\n");
    dk.say("For some commands you can run using the ID of the container. Run 'dk list' commands to get all IDs");
}

module.exports = help;
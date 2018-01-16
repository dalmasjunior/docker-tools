`use strict`
class Talk {
    say(toSay) {
        return console.log(toSay);
    };
}
module.exports.Talk = new Talk;
var os=require("os")

module.exports.cpus = function () {
return os.cpus().length+''
}
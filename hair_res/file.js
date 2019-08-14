const fs = require('fs')
const encoding = require("encoding")
const compressing = require("compressing")
const unzip = require("unzip")

module.exports.size = function (file) {
    return fs.statSync(file).size
}
module.exports.iconv = function (file,fcode,tcode) {
    var buff = fs.readFileSync(file)
    var resu = encoding.convert(buff,tcode,fcode)
    fs.writeFileSync(file,resu)
}
module.exports.zip = function (file,tfile) {
    new compressing.zip.FileStream({ source: file })
    .pipe(fs.createWriteStream(tfile))
}
module.exports.unzip = function (file,path) {
    fs.createReadStream(file).pipe(unzip.Extract({ path: path }))
}

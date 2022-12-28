const fs = require('fs')
const iconv = require("iconv-lite")
const compressing = require("compressing")

module.exports.size = function (file) {
    return fs.statSync(file).size
}
module.exports.iconv = function (file,fcode,tcode) {
    fs.createReadStream(file)
    .pipe(iconv.decodeStream(fcode))
    .pipe(iconv.encodeStream(tcode,{addBOM: true}))
    .pipe(fs.createWriteStream('_iconv_temp'));

    // var buff = fs.readFileSync(file)
    // var resu = encoding.convert(buff,tcode,fcode)
    // fs.writeFileSync(file,resu)
}
module.exports.zip = function (file,tfile) {
    new compressing.zip.FileStream({ source: file })
    .pipe(fs.createWriteStream(tfile))
}
module.exports.unzip = function (file,dir) {
    compressing.zip.uncompress(file,dir)
}
module.exports.zipDir = function (file,dir) {
    compressing.zip.compressDir(file,dir)
}

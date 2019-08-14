const fs = require('fs')
const request = require("request")
const program = require('commander')
const ftp = require("basic-ftp")


program
.version('2.0')
.usage('Hair Web Module')

program
.command('get <filename> <url>')
.description('http get')
.action(function(filename,url){
    request(url).pipe(fs.createWriteStream(filename))
})

program
.command('post <filename> <url> <body> <header>')
.description('http post')
.action(function(filename,url,body,header){
    //console.log(eval('(' + header + ')'))
    if (body==0&!header==0) {request.post({url:url,headers:eval('(' + header + ')')}).pipe(fs.createWriteStream(filename))}
    if (!body==0&header==0) {request.post({url:url,form:eval('(' + body + ')')}).pipe(fs.createWriteStream(filename))}
    if (body==0&header==0) {request.post({url:url}).pipe(fs.createWriteStream(filename))}
    if (!body==0&!header==0) {request.post({url:url,headers:eval('(' + header + ')'),form:eval('(' + body + ')')}).pipe(fs.createWriteStream(filename))}
    //request.post({url:url,headers:eval('(' + header + ')'),form:eval('(' + body + ')')}).pipe(fs.createWriteStream(filename))
})

program
.command('download <host> <user> <password> <dir> <filename>')
.description('ftp upload')
.action(async function(host,user,password,dir,filename){
    const client = new ftp.Client()
    try {
        //client.access(access)
        await client.access({
            host: host,
            user: user,
            password: password,
            //secure: false
        })
        //console.log(await client.list())
        //await client.cd("report10.0/stable/")
        await client.cd(dir)
        //await client.downloadDir("/Users/stephenking/Downloads")
        //await client.download(fs.createWriteStream("fine-activator-10.0.jar"), "fine-activator-10.0.jar")
        await client.upload(fs.createReadStream(filename), filename)
    }
    catch(err) {
        console.log(err)
    }
    client.close()
})

program
.command('download <host> <user> <password> <dir> <filename>')
.description('ftp download')
.action(async function(host,user,password,dir,filename){
    const client = new ftp.Client()
    try {
        //client.access(access)
        await client.access({
            host: host,
            user: user,
            password: password,
            //secure: false
        })
        //console.log(await client.list())
        //await client.cd("report10.0/stable/")
        await client.cd(dir)
        //await client.downloadDir("/Users/stephenking/Downloads")
        //await client.download(fs.createWriteStream("fine-activator-10.0.jar"), "fine-activator-10.0.jar")
        await client.download(fs.createWriteStream(filename), filename)
    }
    catch(err) {
        console.log(err)
    }
    client.close()
})

program.parse(process.argv)

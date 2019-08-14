const nodemailer = require("nodemailer");
const program = require('commander');

program
.version('2.0')
.usage('Hair Mail Module')

program
.command('send <host> <port> <secure> <user> <pass> <from> <to> <subject> <html> <attach>')
.description('send your email')
.action(function(host, port, secure, user, pass, from, to, subject, html, attach){
    main(host, port, secure, user, pass, from, to, subject, html, attach)
})

async function main(host, port, secure, user, pass, from, to, subject, html, attach){

  let transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure, // true for 465, false for other ports
    auth: {
      user: user, // generated ethereal user
      pass: pass // generated ethereal password
    }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
    attachments: [
        {
            path: attach
        }
    ]
  };

  if (attach==0) {
    let mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    };
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)
}

program.parse(process.argv)
const nodeMailer = require("nodemailer")
const handlebars = require("handlebars")
const hbs = require("nodemailer-express-handlebars")
const fs = require("fs")
const dotenv = require ("dotenv").config()


const readHTMLFile = function(path, callback){
    fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
        if(err){
            callback(err);
        }
        else{
            callback(null, html)
        }
    })
}

const transporter = nodeMailer.createTransport({
    service: "Hotmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

async function logCreateCostumer() {

// transporter.use("compile", hbs({
//     viewEngine:{
//         partialsDir:"./views/partials",
//         layoutsDir: "./views/layouts",
//         extname: ".hbs"
//     },
//     extName:".hbs",
//     viewPath:"views/email"
// }))

readHTMLFile("./views/email/template.html", async (err, html) => {
                                                                                              const template = handlebars.compile(html)
    const replacements = {
        name:"Teste de parametro"
    }
    const htmlToSend = template(replacements)
    const mailOptions = {
        from: process.env.EMAIL,
        to: "francielesantos1224@gmail.com",
        // guilherme.goncalves.10@hotmail.com
        subject: `Logs de criação do cliente`,
        html: htmlToSend
    }
    
    const send = await transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(res);
        }
    })
})

}

logCreateCostumer()
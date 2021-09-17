const nodeMailer = require("nodemailer")
const handlebars = require("handlebars")
const hbs = require("nodemailer-express-handlebars")

const transporter = nodeMailer.createTransport({
    service: "Hotmail",
    auth:{
        user:"anderson_julio_15@hotmail.com",
        pass: "XAndersonX15"
    }
})

async function logCreateCostumer() {

transporter.use("compile", hbs({
    viewEngine:{
        partialsDir:"./views/partials",
        layoutsDir: "./views/layouts",
        extname: ".hbs"
    },
    extName:".hbs",
    viewPath:"views/email"
}))

    const mailOptions = {
        from: "anderson_julio_15@hotmail.com",
        to: "andersonjulio15@gmail.com",
        subject: `Logs de criação do cliente`,
        context: {
            name:"Antsinho"
        },
        template: "costumer"
    }

    const send = await transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(res);
        }
    })
}

logCreateCostumer()
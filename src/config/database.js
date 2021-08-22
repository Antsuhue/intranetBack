const mongoose = require("mongoose")
const uri = "mongodb+srv://anderson:doka1@tikos-project.ugnaf.gcp.mongodb.net/intranet?retryWrites=true&w=majority"
var options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

try {
    mongoose.connect(uri, options)
    console.log("Banco conectado!");
    mongoose.set("useFindAndModify", true)
    
} catch (err) {
    console.log(err);
}

module.exports = mongoose
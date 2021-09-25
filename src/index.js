const express = require ("express")
const cors = require("cors")
const routes = require("./routes")
const db = require("./config/database")
const dotenv = require ("dotenv").config()


const app = express();
const PORT = 3300

app.use(cors())
app.use(express.static("../views"))
app.db = db
app.use(express.json())
app.use(routes)

console.log(process.env.EMAIL);

app.listen(PORT, function(){
    console.log("Servidor iniciado em http://localhost:"+PORT);
})
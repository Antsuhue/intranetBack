const express = require ("express")
const cors = require("cors")
const routes = require("./routes")
const db = require("./config/database")
require ("dotenv").config()

const app = express();
const PORT = 3000

app.use(cors())
app.db = db
app.use(express.json())
app.use(routes)


app.listen(PORT, function(){
    console.log("Servidor iniciado em http://localhost:"+PORT);
})
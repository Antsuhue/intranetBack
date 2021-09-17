const express = require("express")
const { createUser, searchUser } = require("./controller/users")
const { createNote, listNotes, specifySearch } = require("./controller/notes")
const { createCostumer, listCostumer } = require("./controller/costumer")

const routes = express.Router()

routes.get("/", function(req,res){
    return res.json({"return":"ok"})
})

routes.post("/createUser", createUser)

routes.post("/login", searchUser)

routes.get("/costumers", listCostumer)

routes.post("/costumer/create", createCostumer)

routes.post("/createNote", createNote)

routes.get("/notes", listNotes)

routes.get("/notes/:filter/:searchParam", specifySearch)

 
module.exports = routes
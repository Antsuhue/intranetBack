const express = require("express")
const { createUser, searchUser } = require("./controller/users")
const { createNote, listNotes } = require("./controller/notes")

const routes = express.Router()


routes.get("/", function(req,res){
    return res.json({"return":"ok"})
})

routes.post("/createUser", createUser)

routes.post("/login", searchUser)

routes.post("/createNote", createNote)

routes.get("/notes", listNotes)

 
module.exports = routes
const mongoose = require("mongoose")

const inUser = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    pass: {
        type: String,
        require: true
    }
},{
    timestamps: true
})

const InUser = mongoose.model("in_usuario", inUser, "in_usuario")

module.exports = InUser
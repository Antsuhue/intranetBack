const mongoose = require ("mongoose")

const inNote = new mongoose.Schema({

    idcliente:{
        type:String,
    },
    
    costumerName: {
        type:String
    },

    sellerName: {
        type: String
    },
    itens:{
        type: Array,
        require: true
    },
    valorTotal: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    created_at: {
        type: String,
        require: true
    },
    updated_at: {
        type: String,
        require: true
    }
})

const InNote = mongoose.model("in_notes", inNote, "in_notes")

module.exports = InNote

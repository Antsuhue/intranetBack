const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const inCostumer = new mongoose.Schema({ 
    name: {
        type:String,
        require:true
    },
    address: {
        type:String,
        require:true
    },
    listIdNotes: {
        type: Array,
        required: true 
    },
    email:{
        type:String,
    },
    payment: {
        type: Object,
    },
    tel: {
        type:String,
    }
})

const InCostumer = mongoose.model("in_costumer", inCostumer, "in_costumer")

module.exports = InCostumer
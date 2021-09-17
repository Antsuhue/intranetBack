const modelCostumer = require("../model/costumer")
const axios = require("axios")
const moment = require("moment")
const now = moment()
const format = "YYYY-MM-DD HH:mm:ss"
const { postMessageCreateCostume } = require("../controller/slack")

const slackToken = "xoxb-2401946777185-2388528627077-LhjN6nXU42U5KAdsbSKt3036"


async function createCostumer (req, res){

    const body = req.body

    const resultCreate = await modelCostumer.create( {
        "name" : body.name.toLowerCase(),
        "address" : body.address.toLowerCase(),
        "listIdNotes" : [],
        "email" : body.email.toLowerCase(),
        "tel": body.tel,
        "payment" : {
            "totalPaid" : 0,
            "totalInDebit" : 0,
            "totalToPay" : 0
        },
        "created_at":moment(now).format(format),
        "update_at":moment(now).format(format),
    }, async (err, result) =>{
        if (err){
            
            return res.status(400).json({status:err})
        }
        else{
            
            postMessageCreateCostume(result)            

        }
    })
}

async function listCostumer(req, res){
    const costumers = await modelCostumer.find()

    return res.status(200).json({costumers})
}

async function searchCostumer(req, res){
    const body = req.body
    const costumer = await modelCostumer.findOne({ "name": body.name })

    return res.stauts(200).json({costumer})
}

module.exports = { createCostumer, listCostumer }
const modelNote = require("../model/note")
const axios = require("axios")
const moment = require("moment")
const { create } = require("../model/note")
const now = moment()
const { postMessageCreateNote } = require("../controller/slack")
const format = "YYYY-MM-DD HH:mm:ss"

const slackToken = "xoxb-2401946777185-2388528627077-LhjN6nXU42U5KAdsbSKt3036"
async function createNote(req, res) {
    const body = req.body
    let totalToPay = 0

    await body.itensList.forEach(e => {
        totalToPay = totalToPay + parseFloat(e.total)

    })

    console.log(totalToPay);

    const note = await modelNote.create({
        "costumerName": body.costumerName.toLowerCase(),
        "sellerName": body.sellerName.toLowerCase(),
        "itens": body.itensList,
        "valorTotal": totalToPay.toFixed(2),
        "status": "pendente",
        "created_at": moment(now).format(format),
        "updated_at": moment(now).format(format),
    }, async (err, result) => {

        postMessageCreateNote(result)

    })
    return res.status(200).json(note)

}


async function listNotes(req, res) {
    const result = await modelNote.find()

    let list = []

    result.forEach(e => {
        let format = formatValue(e.valorTotal)

        let obj = {
            "itens": e.itens,
            "idNota": e._id,
            "costumerName": e.costumerName,
            "sellerName": e.sellerName,
            "total": format,
            "data": moment(e.created_at).format("DD/MM/YYYY"),
            "status": e.status

        }

        list.push(obj)

    });

    return res.status(200).json(list)
}

async function specifySearch(req, res) {

    const body = req.body
    const data = body.data
    let statusCode = 200
    let resultList = []
            
    const parameters = req.params
    const filter = parameters.filter
    console.log(parameters);

    switch (filter) {
        case "costumerName":
            await modelNote.find({ costumerName: parameters.searchParam }, (err, doc) => {
                doc.forEach(e => { 

                    let obj = createObj(e)
                    resultList.push(obj)
                });
            })
            return res.status(statusCode).json(resultList)

        case "sellerName":            
            await modelNote.find({ sellerName: parameters.searchParam }, (err, doc) => {
                doc.forEach(e => {
                    let obj = createObj(e)

                    resultList.push(obj)
                
                });
            })
            return res.status(statusCode).json(resultList)

        case "idNoteComplete":
            await modelNote.findById(parameters.searchParam, (err,result) => {
                if(err){
                    console.log(err);
                }
                resultList = result
                // const update = moment(resultList.updated_at).format("DD/MM/YYYY")
                // const created = moment(resultList.created_at).format("DD/MM/YYYY")
            })
            return res.status(200).json(resultList)
        
        default:
            resultList = "erro"
            statusCode = 400
            
    }

}

async function noteCod(data) {
    const body = req.body
}

function createObj(e){
    let format = formatValue(e.valorTotal)
                    
    let obj = {
        "itens": e.itens,
        "idNota": e._id,
        "costumerName": e.costumerName,
        "sellerName": e.sellerName,
        "total": format,
        "data": moment(e.created_at).format("DD/MM/YYYY"),
        "status": e.status

    }
    return obj
}

async function costumerName(data) {

    await modelNote.findOne({ status: "Pendente" }, (err, result) => {
        if (err) {
            console.log(err);
        }
        return result

    })
}

async function sellerName(data) {

    await modelNote.find({ "sellerName": data }, (err, result) => {
        if (err) {
            console.log(err);
        }
        return result
    })
}

function formatValue(value) {

    let formatedValue = String(value)
    formatedValue = formatedValue.replace(".", ",")
    return formatedValue
}

module.exports = { createNote, listNotes, specifySearch }
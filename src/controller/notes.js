const modelNote = require("../model/note")
const axios = require("axios")

const slackToken = process.env.SLACK_TOKEN

async function createNote(req,res){
    const body = req.body
    let totalToPay = 0

    await body.itensList.forEach(e => {
        totalToPay = totalToPay + parseFloat(e.total)
          
    }) 

    console.log(totalToPay);

    const note = await modelNote.create({
        "costumerName": body.costumerName,
        "sellerName": body.sellerName,
        "itens":body.itensList,
        "valorTotal": totalToPay.toFixed(2),
        "status": "Pendente"
     }, async (err,result) => {
      
        const url = 'https://slack.com/api/chat.postMessage'
        const a = await axios.post(url, {
            channel: '#criacao-de-notas',
            text: result
        },{ headers : { authorization: `Bearer ${slackToken}`} })
        
        console.log(a);
        
    })
    return res.status(200).json(note)    
    
}


async function listNotes (req, res){
    const result = await modelNote.find()

    let list = []

    result.forEach(e => {

        let formatedValue = e.valorTotal.toFixed(2)
        formatedValue = formatedValue.replace(".",",")

        let obj = {
            "itens":e.itens,
            "idNota":e._id,
            "costumerName":e.costumerName,
            "sellerName":e.sellerName,
            "total": formatedValue,
            "Data": e.createdAt,
            "status": e.status
            
        }

        list.push(obj)    
        
    });

    return res.status(200).json(list)
}

async function specifySearch(req,res){
    
    const body = req.body
    const searchFor = body.searchFor
    const data = body.data

    const obj = {
        searchFor: data
    }

    const response = await modelNote.find(obj)

    return res.status(200).json(response)
}
    

module.exports = { createNote, listNotes, specifySearch }
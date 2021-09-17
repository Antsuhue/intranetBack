const axios = require("axios")

const slackToken = "xoxb-2401946777185-2388528627077-LhjN6nXU42U5KAdsbSKt3036"

async function postMessageCreateNote(params){

const url = 'https://slack.com/api/chat.postMessage'
const a = await axios.post(url, {
    channel: '#criacao-de-notas',
    text: params
}, { headers: { Authorization: `Bearer ${slackToken}` } })

console.log(a);

}

async function postMessageCreateCostume(params){
    
    try {
        const url = 'https://slack.com/api/chat.postMessage'
        const a = await axios.post(url, {
            channel: '#criar-clientes',
            text: params
        }, { headers: { Authorization: `Bearer ${slackToken}` } })
        
        console.log(a)
        return res.status(200).json({status:"Cliente criado com sucesso!"})
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { postMessageCreateNote, postMessageCreateCostume }
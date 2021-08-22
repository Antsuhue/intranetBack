const axios = require('axios');

const slackToken = process.env.SLACK_TOKEN;

let obj = {
    "ts":"ts"
}

run().catch(err => console.log(err));

async function run() {
  const url = 'https://slack.com/api/chat.postMessage';
  const res = await axios.post(url, {
    channel: '#geral',
    text: obj
  }, { headers: { authorization: `Bearer ${slackToken}` } });

  console.log('Done', res.data);
}
'use strict';

require( 'dotenv' ).config( {silent: true} );

const express = require( 'express' );  // app server
const bodyParser = require( 'body-parser' );  // parser for post requests
const watson = require( 'watson-developer-cloud' );  // watson sdk

const app = express();
app.use(express.static('./public'));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("chatbot running on port 3000");
})

const conversation = watson.conversation( {
    url: process.env.CONVERSATION_URL,
    username: process.env.CONVERSATION_USERNAME || '<username>',
    password: process.env.CONVERSATION_PASSWORD || '<password>',
    path: {workspace_id: process.env.CONVERSATION_WORKSPACE_ID || '<workspace_id>'},
    version_date: process.env.CONVERSATION_VERSION_DATE,
    version: 'v1'
  });

let previousContext = null;

app.post('/message', (req, res) => {
    console.log("request initiated");
    console.log(req);



    // if (res.intents.length > 0) {
    //     console.log(`Detected intent: #${response.intents[0].intent}, ${response.entities[0].entity}`);
    // }

    // if (res.output.text.length != 0) {
    //     console.log(response.output.text[0]);
    //     return response.output.text[0];
    // }
    conversation.message({
        input: {text: "How do I get access"},
    }, processResponse)  
})

const processResponse = (err, response) => {
    if (err) {
        console.log("error: ", err);
    } else {
        console.log(JSON.stringify(response, null, 2));
    }
}

module.exports = app;
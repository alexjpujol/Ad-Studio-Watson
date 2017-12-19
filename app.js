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

app.post('/message',  function(req, res) {

    console.log(req);
    let watsonPayload = {
        workspace_id: process.env.CONVERSATION_WORKSPACE_ID
    }

    if (req.body.input.text) {
        watsonPayload.input = {'text': req.body.input.text}
    } else {
        watsonPayload.input = {'text': ""}
    }

    if (req.body.context) {
        watsonPayload.context = req.body.context;
        previousContext = req.body.context;
    } else {
        watsonPayload.context = previousContext;
    }

    conversation.message(watsonPayload,  function(err, response) {
        if (err) {
            console.log('error:', err);
        }
        else {
            return res.send(JSON.stringify(response, null, 2));
        }
      });
})

module.exports = app;
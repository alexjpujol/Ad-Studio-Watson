(function() {

    let apiEndpoint = "/message";
    let submitButton = document.getElementById("submit_chat");
    let textInput = document.getElementById("chat_input");
    let requestHeaders = {'Content-type': 'application/json'};

    function buildChatNode(chatResponse) {
        let convo = document.getElementById("conversation_list");
        let chatNode = document.createElement("li");
        chatNode.innerText = chatResponse;
        convo.appendChild(chatNode);
        return;
    }

    function* ContextGenerator() {
        let id = 0;
        while(true) {
            yield ++id;
        }
    }

    let context = ContextGenerator();

    function sendWatsonChat() {

        let chatText = textInput.value;
        let currentContext = context.next().value;
        
        textInput.value = "";
        console.log(chatText);

        let options = {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify({input: 
                {"text": chatText},
                context: {currentContext}
            })
        }

        fetch(apiEndpoint, options).then((res) => {
            if(res.status == 200) {
                return res.json();
            }
        }).then((data) => {
            let chatResponse = data.output.text[0];
            buildChatNode(chatResponse);
        }).catch((error) => {
            console.error(error);
        })  
    }

    //initiate the chat
    sendWatsonChat();

    //attach event handler
    submitButton.addEventListener("click", sendWatsonChat);

})();
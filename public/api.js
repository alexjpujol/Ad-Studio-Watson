(function() {

    let apiEndpoint = "/message";
    let submitButton = document.getElementById("submit_chat");
    let textInput = document.getElementById("chat_input");
    let convo = document.getElementById("conversation_list");
    let requestHeaders = {'Content-type': 'application/json'};
    let chatID = Math.floor(Math.random() * 1000000);


    function getUserChat() {
        let chatText = textInput.value;
        return chatText;
    }

    function buildWatsonChatNode(chatResponse) {
        let chatNode = document.createElement("li");
        chatNode.className = "watson_chat speech-bubble on-appear"
        chatNode.innerText = chatResponse;
        convo.appendChild(chatNode);
        setTimeout(() => {
            chatNode.classList.remove("on-appear")
        }, 300)
        //chatNode.classList.remove("on-appear");

        scrollChat();
        return;
    }

    function buildUserChatNode() {
        let chatNode = document.createElement("li");
        chatNode.className = "user_chat speech-bubble";
        chatNode.innerText = getUserChat();
        convo.appendChild(chatNode);
        scrollChat();
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

        let chatText = getUserChat();
        let currentContext = context.next().value;
        
        textInput.value = "";

        let options = {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify({input: 
                {"text": chatText},
                context: {counter: currentContext, chatID: chatID}
            })
        }

        fetch(apiEndpoint, options).then((res) => {
            if(res.status == 200) {
                return res.json();
            }
        }).then((data) => {
            let chatResponse = data.output.text[0];
            buildWatsonChatNode(chatResponse);
        }).catch((error) => {
            console.error(error);
        })  
    }

    //initiate the chat
    sendWatsonChat();

    //attach event handler
    submitButton.addEventListener("click", buildUserChatNode);
    submitButton.addEventListener("click", sendWatsonChat);
    textInput.addEventListener("keydown", function(e) {
        if (e.keyCode == 13) {
            buildUserChatNode();
            sendWatsonChat();
            textInput.value = "";
        }
    });

    //scroll the chat
    function scrollChat() {
        let div = document.getElementById("conversation");
        let isScrolledToBottom = div.scrollHeight - div.clientHeight <= div.scrollTop + 1;

        if (!isScrolledToBottom) {
            div.scrollTop = div.scrollHeight - div.clientHeight;
        }
    }

})();
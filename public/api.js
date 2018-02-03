(function() {

    const apiEndpoint = "/message";
    const submitButton = document.getElementById("submit_chat");
    const textInput = document.getElementById("chat_input");
    const convo = document.getElementById("conversation_list");
    const requestHeaders = {'Content-type': 'application/json'};
    const chatID = Math.floor(Math.random() * 1000000);


    const buildWatsonChatNode = (chatResponse) => {
        const chatNode = document.createElement("li");
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

    const buildUserChatNode = () => {
        let chatNode = document.createElement("li");
        chatNode.className = "user_chat speech-bubble";
        chatNode.innerText = textInput.value;
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

    const context = ContextGenerator();

    const sendWatsonChat = () => {

        const chatText = textInput.value;
        const currentContext = context.next().value;
        
        textInput.value = "";

        const options = {
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
            const chatResponse = data.output.text[0] ? data.output.text[0] : "Sorry, I didn't understand that.";
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
    textInput.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
            buildUserChatNode();
            sendWatsonChat();
            textInput.value = "";
        }
    });

    //scroll the chat
    const scrollChat = () => {
        const div = document.getElementById("conversation");
        const isScrolledToBottom = div.scrollHeight - div.clientHeight <= div.scrollTop + 1;

        if (!isScrolledToBottom) {
            div.scrollTop = div.scrollHeight - div.clientHeight;
        }
    }

})();
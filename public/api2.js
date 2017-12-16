(function() {

    let apiEndpoint = "/message";
    let submitButton = document.getElementById("submit_chat");
    let textInput = document.getElementById("chat_input");
    let requestHeaders = {'Content-type': 'application/json'}
    
    function buildChatNode(chatResponse) {
        let convo = document.getElementById("conversation_list");
        let chatNode = document.createElement("li");
        chatNode.innerText = chatResponse;
        convo.appendChild(chatNode);
        return;
    }

    function sendWatsonChat() {
        fetch(apiEndpoint, {
            method: "POST",
            headers: requestHeaders,
            body: ""
        }).then((res) => {
            if(res.status == 200) {
                return res.json();
            }
            else if(res.status == 400) {
                console.log(JSON.stringify(res.body.json()));  //res.body is undefined.
            }
        }).then((data) => {
            let chatResponse = data.output.text[0];
            buildChatNode(chatResponse);
        })  
    }



    submitButton.addEventListener("click", sendWatsonChat);

})();
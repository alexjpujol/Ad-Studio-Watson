(function() {
    let apiEndpoint = new Promise("/message");
    let submitButton = document.getElementById("submit_chat");
    let textInput = document.getElementById("chat_input");

    //event listener on send button
    submitButton.addEventListener("click", buildChatNode);
        // let message = textInput.value;
        // textInput.value = "";
        // let chatResponse = handleApi(message);
        // let convo = document.getElementById("conversation_list");
        // let chatNode = document.createElement("li");
        // chatNode.innerText = chatReponse;
        // convo.appendChild(chatNode);
   
    //makes the AJAX call to Watson API
    function handleApi(message) {
        var http = new XMLHttpRequest();
        http.open('POST', apiEndpoint, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = function() {
            if (http.readyState === 4 && http.status === 200 && http.responseText) {
            let text = JSON.parse(http.responseText);
            resolve (text.output.text[0]);
            }
        };
        http.send();
    };
    function getChatText() {
        let message = textInput.value;
        textInput.value = "";
        return message;
    }

    function buildChatNode() {
        console.log(getChatText().then(handleApi(), ()=>{console.error(err)}));
        return
    }




    //    try {
    //     var http = new XMLHttpRequest();
    //     http.open('POST', apiEndpoint, true);
    //     http.setRequestHeader('Content-type', 'application/json');
    //     http.onreadystatechange = function() {
    //       if (http.readyState === 4 && http.status === 200 && http.responseText) {
    //         let text = JSON.parse(http.responseText);
    //         return text.output.text[0];
    //       }
    //     };
    //     http.send();
    //    }
    //    catch(error) {
    //         console.error(error);
    //    }
})()
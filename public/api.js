(function() {
    let apiEndpoint = "/message";
    let submitButton = document.getElementById("submit_chat");
    let textInput = document.getElementById("chat_input");

    //event listener on send button
    submitButton.addEventListener("click", async (e) => {
        let message = textInput.value;
        textInput.value = "";
        let chatResponse = await handleApi(message);
        let convo = document.getElementById("conversation_list");
        let chatNode = document.createElement("li");
        chatNode.innerText = chatReponse;
        convo.appendChild(chatNode);
    });
   
    //makes the AJAX call to Watson API
    function handleApi(message) {
       try {
        var http = new XMLHttpRequest();
        http.open('POST', apiEndpoint, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = function() {
          if (http.readyState === 4 && http.status === 200 && http.responseText) {
            let text = JSON.parse(http.responseText);
            return text.output.text[0];
          }
        };
        http.send();
       }
       catch(error) {
            console.error(error);
       }
    };
})()
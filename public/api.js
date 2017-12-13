const Api = (function() {
    let apiEndpoint = new Request("/message");
    let submitButton = document.getElementById("submit_chat");
    let textInput = document.getElementById("chat_input");

    submitButton.addEventListener("click", (e) => {
        let message = textInput.value;
        textInput.value = "";
        handleApi(message);
    })
    
   async function handleApi(message) {
       try {
           let result = await fetch(apiEndpoint, {method: 'POST', body: message});
           console.log(`final result: ${result.blob()}`);
       }
       catch(error) {
            console.error(error);
       }
    }
})()
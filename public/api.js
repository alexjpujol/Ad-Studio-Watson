const Api = (function() {
    let apiEndpoint = "/message";
    let submitButton = document.getElementById("submit_chat");
    let textInput = document.getElementById("chat_input");

    submitButton.addEventListener("click", (e) => {
        let message = textInput.value;
        console.log(message);
        textInput.value = "";
        handleApi(message);
    })

    async function handleApi(message) {
        let response = await fetch(apiEndpoint, {method: 'POST', body: message})
        .catch((error) => {
            console.error(error);
        });
        console.log(message);
        console.log(response);
        return
    }
})()
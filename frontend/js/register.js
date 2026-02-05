document.addEventListener("DOMContentLoaded", () => {

    const continueBtn = document.querySelector("#continueBtn");

    continueBtn.addEventListener("click", async (clickEventDetails) => {
        const usernameInput = document.querySelector("#usernameInput");
        const passwordInput = document.querySelector("#passwordInput");

        const responseText = document.querySelector("#response-msg");

        await fetch("http://localhost:5501/register", {
            "method": "POST", // http request type
            "headers": { // tells server data in is JSON
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            "body": JSON.stringify({
                'Username': usernameInput.value,
                'Password': passwordInput.value,
            })
        }).then(async function (serverResponsePromise) {
            // TODO: ask pexel to remember the syntax for the double await, awaiting the fetch then awaiting response
            await serverResponsePromise.json().then(function (serverResponse) {
                responseText.innerHTML = serverResponse["message"];
                responseText.style.color = serverResponsePromise["status"] == "200" ? "green" : "red";
                
                // Redirect to login page on successful registration
                if (serverResponsePromise.status === 200) {
                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 1500);
                }
            }).catch((error) => {
                responseText.innerHTML = "Error! Please try again.";
                responseText.style.color = "red";
            });
        }).catch((error) => {
            responseText.innerHTML = "Error! Please try again.";
            responseText.style.color = "red";
        });
    });
});
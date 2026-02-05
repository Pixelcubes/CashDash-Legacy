document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.querySelector("#loginBtn");
    const usernameInput = document.querySelector("#usernameInput");
    const passwordInput = document.querySelector("#passwordInput");

    // Create a response message element
    const responseMsg = document.createElement("p");
    responseMsg.id = "response-msg";
    responseMsg.style.textAlign = "center";
    responseMsg.style.marginTop = "10px";
    responseMsg.style.fontSize = "14px";
    loginBtn.parentNode.appendChild(responseMsg);

    loginBtn.addEventListener("click", async (clickEvent) => {
        try {
            const response = await fetch("http://localhost:5501/login", {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                "body": JSON.stringify({
                    'Username': usernameInput.value,
                    'Password': passwordInput.value,
                })
            });

            const data = await response.json();
            
            if (response.status === 200) {
                responseMsg.style.color = "green";
                responseMsg.textContent = data.message;
                
                // Store user info in sessionStorage
                sessionStorage.setItem('userId', data.userId);
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('displayName', data.displayName);
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);
            } else {
                responseMsg.style.color = "red";
                responseMsg.textContent = data.message;
            }
        } catch (error) {
            responseMsg.style.color = "red";
            responseMsg.textContent = "Error connecting to server. Please make sure the backend is running.";
            console.log("Error: " + error);
        }
    });
});
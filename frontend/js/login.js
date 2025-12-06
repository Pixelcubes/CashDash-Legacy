document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.querySelector("#loginBtn");

    loginBtn.addEventListener("click", async (clickEvent) => {
        try {
            await fetch("http://localhost:5501/test/fb66e1f1-2bde-4208-847e-7d3b8a99f535", {
                "method": "GET",
                "headers": {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((httpResponse) => {
                console.log(httpResponse.json());
            });
        } catch (error) {
            console.log("Error: " + error);
        }
    });
});
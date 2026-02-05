// import Router to handle endpoints subrouting
const app = require("express").Router();

// import supabase API
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = 'https://bpjmdrzhirsebupwxgbp.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post("/login", async function (request, response) {
    console.log(request.body);
    const username = request.body["Username"];
    const password = request.body["Password"];

    await supabase.from('users').select('*').eq("username", username).eq("password", password).then(async function (selectQueryResult) {
        if (selectQueryResult["error"] != null) { // database error
            response.status(500).json({
                "message": "Error. Try Again!",
            });
        } else if (selectQueryResult["data"].length === 0) { // user not found or password incorrect
            response.status(401).json({
                "message": "Invalid username or password.",
            });
        } else if (selectQueryResult["data"].length > 0) { // login successful
            const user = selectQueryResult["data"][0];
            response.status(200).json({
                "message": "Login successful!",
                "userId": user.id,
                "username": user.username,
                "displayName": user.display_name,
            });
        }
    });
});

module.exports = app;

// import Router to handle endpoints subrouting
const app = require("express").Router();

// import supabase API
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = 'https://bpjmdrzhirsebupwxgbp.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post("/register", async function (request, response) {
    console.log(request.body);
    const username = request.body["Username"];
    const password = request.body["Password"];

    await supabase.from('users').select('*').eq("username", username).then(async function (selectQueryResult) {
        if (selectQueryResult["error"] != null) { // database error
            response.status(500).json({
                "message": "Error. Try Again!",
            });
        } else if (selectQueryResult["data"].length > 0) { // duplicate username found
            response.status(500).json({
                "message": "Error. Username already exists.",
            });
        } else if (selectQueryResult["data"].length == 0) { // duplicate username NOT found
            await supabase
                .from('users')
                .insert([
                    {
                        "username": username,
                        "display_name": username,
                        "password": password,
                    }
                ])
                .select().then(function (insertQueryResult) {
                    if (insertQueryResult["error"] != null) { // database error
                        response.status(500).json({
                            "message": "Error, try again!",
                        });
                    } else { // good to go
                        console.log(insertQueryResult);
                        response.status(200).json({
                            "message": "Account created successfully.",
                        });
                    }
                });
        }
    });
});

module.exports = app;
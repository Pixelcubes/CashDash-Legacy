// Core handler file to handle different endpoints

//import dotenv
const dotenv = require("dotenv");
dotenv.config();

// import express.js
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// import routes (endpoints)
const registerRoute = require("./endpoints/register.endpoint.js");
const loginRoute = require("./endpoints/login.endpoint.js");

// import supabase API
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = 'https://bpjmdrzhirsebupwxgbp.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json());

// use routes (endpoints)
app.use(registerRoute);
app.use(loginRoute);

app.get("/test/:uuid", async (request, response) => {
    const uuid = request.params.uuid;
    await supabase.from('users').select('*').eq("id", uuid).then((queryResult) => {
        if (!queryResult.error) {
            response.status(200).json({
                "message": "Request OK",
                "query": queryResult.data[0].display_name,
            })
        } else {
            response.status(500).json({
                "message": "Error. Try Again!",
            });
        }
    });
});

app.listen(5501, () => { // hosting port: 5501
    console.log("Server Session started.");
});


function whenSupabaseCallsMeBack(queryResult) {
    
}
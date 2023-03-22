// Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable 
// to '0' makes TLS connections and HTTPS requests insecure by 
// disabling certificate verification.
//
// SHOULD NOT DO THIS IF YOU HAVE CERTIFICATE
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require('fs');

// Cross-Origin Resource Sharing (CORS) is an HTTP-header based 
// mechanism that allows a server to indicate any origins 
// (domain, scheme, or port) other than its own from which a 
// browser should permit loading resources.
const cors = require('cors');

const https = require('https');

// https.globalAgent.options.rejectUnauthorized = false;

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./routes');

app.use('/api/v1', router);

require("./models/db");

app.get("/", (req, res, next) => {
    res.contentType = "text/plain";
    res.send("Hello World!");
    next();
});

// Create an HTTPS server 
https
    .createServer(
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(8080, () => {
        console.log("serever is runing at port 8080");
    });


//app.listen(process.env.PORT || 8080, () => {
//    console.log("Server running on port 8080.");
//});
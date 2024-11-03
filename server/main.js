"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
var http = require("node:http");
http.createServer(function (req, res) {
    console.log("\n        =============================\n\n        ".concat(req.method, "\n\n         ").concat(req.url, "\n\n         ").concat(req.headers, "\n\n        =============================\n\n        "));
    switch (req.method) {
        case "GET":
            get(req.url, res);
            break;
        case "POST":
            post(req, res);
            break;
        default:
            res.writeHead(405, { "Content-type": "text/plain" });
            res.end("405\nUnallowed http method");
            break;
    }
}).listen(80, function () {
    console.log("http://127.0.0.1:80");
});
function get(requestUrl, res) {
    switch (requestUrl) {
        //login page
        case "/":
            fs.readFile("../website/login/login.html", function (err, data) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });
            break;
        case "/login.css":
            fs.readFile("../website/login/login.css", function (err, data) {
                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data);
            });
            break;
        case "/login.js":
            fs.readFile("../website/login/login.js", function (err, data) {
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.end(data);
            });
            break;
        //signup page
        case "/sign_up":
            fs.readFile("../website/sign_up/signup.html", function (err, data) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });
            break;
        case "/sign_up/signup.css":
            fs.readFile("../website/sign_up/signup.css", function (err, data) {
                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data);
            });
            break;
        case "/sign_up/signup.js":
            fs.readFile("../website/sign_up/signup.js", function (err, data) {
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.end(data);
            });
            break;
        //main app
        case "/app":
            fs.readFile("../website/mainApp/app.html", function (err, data) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404\nWrong URL");
            break;
    }
}
function post(req, res) {
    switch (req.url) {
        case "/login":
            var body_1 = "";
            req.on("data", function (chunk) {
                body_1 = chunk.toString();
            });
            req.on("end", function () {
                var jsonBody = JSON.parse(body_1);
                console.log(jsonBody);
                try {
                    res.writeHead(401, { "Content-type": "text/plain" });
                    res.end("login success");
                }
                catch (err) {
                    res.end("there was an error");
                }
            });
            req.on("error", function () {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 error\nSomething went Wrong");
            });
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404\nWrong URL");
            break;
    }
}

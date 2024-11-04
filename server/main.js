"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var fs = require("node:fs");
var http = require("node:http");
//https://github.com/Zeuszzzzz/learningWebdev
var PORT = 80;
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ravi16nP14",
    database: "credentials"
});
connection.connect(function (err) {
    if (err)
        throw err;
});
function loginCheck(Email, Password) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            connection.query("SELECT Email FROM credentials.new_table WHERE Email = \"".concat(Email, "\" AND Password = \"").concat(Password, "\""), function (err, result) {
                                if (err)
                                    return reject(err);
                                resolve(result.length > 0);
                            });
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
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
}).listen(PORT, function () {
    console.log("http://127.0.0.1:" + PORT);
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
    var _this = this;
    switch (req.url) {
        case "/login":
            var body_1 = "";
            req.on("data", function (chunk) {
                body_1 = chunk.toString();
            });
            req.on("end", function () { return __awaiter(_this, void 0, void 0, function () {
                var jsonBody, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jsonBody = JSON.parse(body_1);
                            console.log(jsonBody);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, loginCheck(jsonBody.email, jsonBody.password)];
                        case 2:
                            if (_a.sent()) {
                                res.writeHead(200, { "Content-type": "text/plain" });
                                res.end("login success");
                            }
                            else {
                                res.writeHead(401, { "Content-type": "text/plain" });
                                res.end("login fail");
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
                            res.end("there was an error");
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
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
process.on("SIGINT", function () {
    console.log("Shutting down gracefully...");
    connection.end(function (err) {
        if (err) {
            console.error("Error closing the connection: ", err);
        }
        process.exit();
    });
});

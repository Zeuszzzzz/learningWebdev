import * as mysql from "mysql";
import Connection from "mysql/lib/Connection";
import * as fs from "node:fs";
import * as http from "node:http";

//https://github.com/Zeuszzzzz/learningWebdev
const PORT : number = 80;
const connection:Connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Ravi16nP14",
    database : "credentials"
});
connection.connect((err)=>{
    if (err) throw err;
});


async function loginCheck(Email: string, Password: string): Promise<boolean> {
    try {
        return await new Promise<boolean>((resolve, reject) => {
            connection.query(`SELECT Email FROM credentials.new_table WHERE Email = "${Email}" AND Password = "${Password}"`, (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0);
            });
        });;
    } catch (err) {
        console.error(err);
        return false;
    }
}





http.createServer((req:http.IncomingMessage, res:http.ServerResponse<http.IncomingMessage>) => {
    console.log(`
        =============================\n
        ${req.method}\n
         ${req.url}\n
         ${req.headers}\n
        =============================\n
        `);
    switch(req.method){
        case "GET":
            get(req.url, res);
            break;
        case "POST":
            post(req,res);
            break;
        default:
            res.writeHead(405,{"Content-type" : "text/plain"})
            res.end("405\nUnallowed http method");
            break;
    }
}).listen(PORT,() =>{
    console.log("http://127.0.0.1:" + PORT);
});

function get(requestUrl :string | undefined, res :http.ServerResponse<http.IncomingMessage>) : void{
    switch(requestUrl){
        //login page
        case "/":
            fs.readFile("../website/login/login.html",(err,data) => {
                res.writeHead(200, {"Content-Type" : "text/html"});
                res.end(data);
            });
            break;
        case "/login.css":
                fs.readFile("../website/login/login.css",(err,data) => {
                    res.writeHead(200, {"Content-Type" : "text/css"});
                    res.end(data);
                });
                break;
        case "/login.js":
            fs.readFile("../website/login/login.js", (err,data) => {
                res.writeHead(200, {"Content-Type" : "text/javascript"});
                res.end(data);
            })
            break;
        
        //signup page
        case "/sign_up":
            fs.readFile("../website/sign_up/signup.html", (err,data) => {
                res.writeHead(200, {"Content-Type" : "text/html"});
                res.end(data);
            });
            break;
        case "/sign_up/signup.css":
            fs.readFile("../website/sign_up/signup.css", (err,data) => {
                res.writeHead(200, {"Content-Type" : "text/css"});
                res.end(data);
            });
            break;
        case "/sign_up/signup.js":
            fs.readFile("../website/sign_up/signup.js", (err,data) => {
                res.writeHead(200, {"Content-Type" : "text/javascript"});
                res.end(data);
            });
            break;
        //main app
        case "/app":
            fs.readFile("../website/mainApp/app.html", (err,data) => {
                res.writeHead(200, {"Content-Type" : "text/html"});
                res.end(data);
            });
            break;
        default:
            res.writeHead(404, {"Content-Type" : "text/plain"});
            res.end("404\nWrong URL");
            break;
    }
}

function post(req:http.IncomingMessage,res:http.ServerResponse<http.IncomingMessage>) : void{
    switch(req.url){
        case "/login":
            let body = "";
            req.on("data", (chunk:Buffer) => {
                body = chunk.toString();
            })
            req.on("end", async ()=>{
                let jsonBody : {"email" :string, "password" : string} = JSON.parse(body);
                console.log(jsonBody);
                
                
                try{
                    if(await loginCheck(jsonBody.email, jsonBody.password)){
                        res.writeHead(200, {"Content-type" : "text/plain"});
                        res.end("login success");
                    }
                    else{
                        res.writeHead(401, {"Content-type" : "text/plain"});
                        res.end("login fail");
                    }
                    
                }
                catch(err){
                    res.end("there was an error");
                }
            });

            req.on("error", ()=>{
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end("500 error\nSomething went Wrong");
            });
            break;
        default:
            res.writeHead(404, {"Content-Type" : "text/plain"});
            res.end("404\nWrong URL");
            break;
    }
}
process.on("SIGINT", ()=>{
    console.log("Shutting down gracefully...");
    connection.end((err) => {
        if (err) {
            console.error("Error closing the connection: ", err);
        }
        process.exit();
    });

});
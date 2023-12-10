const http=require("http")
const url=require("url")
const fs=require("fs")

//create server http
http.createServer((req, res)=>{
    res.writeHead(200, {"content-type":"text/plain; charset=utf-8"})
    const urlParsed=url.parse(req.url)

    if(urlParsed.pathname=="/"){
        
    }
}).listen("3000")
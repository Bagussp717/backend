var http = require("http")
var url = require("url")
var fs = require("fs")
var qs = require("querystring")

function css(request, response) {
    if (request.url === "/style.css") {
        response.writeHead(200, {"Content-type":"text/css"});
        var fileContent = fs.readFileSync("./style.css", {encoding: "utf8"});
        response.write(fileContent);
        response.end();
    }
    
}
var renderCV = fs.readFileSync("./cv.html")
var server = http.createServer(function(request,response){
    css(request, response)
    var q = url.parse(request.url,true)
    if (q.pathname == "/" && request.method == "GET"){
        var keyword = q.query.keyword;
        if (keyword){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<h2>Pencarian</h2>");
            response.write("<p>Anda Mencari : <b>" + keyword + "</b> </p>");
            response.write("<h3><b></b>Tidak ada Hasil ! Maaf Website ini masih dalam tahap pengembangan</b></h3>");
            response.end("<a href='/'>Kembali</a>");
            
            
            }
        else{
            fs.readFile("home.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Conten-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data)
            response.end();    
            });
        }
    }
    else if (request.url==="/login" && request.method === "GET"){
        fs.readFile("login.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }
    else if (request.url==="/login" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
            if (formData.username === "bagus" && formData.password === "1121101999"){
                response.writeHead(404,{"Conten-Type": "text/html"});
                response.end(renderCV)
                }
            else{
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<h2>Login Gagal</h2>");
                response.write("<a href='/login'>Coba Kembali</a>");
            }
        });

    }
});

server.listen(3000);
console.log("server Berjalan")

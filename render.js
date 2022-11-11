var http = require("http")
var url = require("url")
var fs = require("fs")
var qs = require("querystring")
const port = process.env.PORT || 3000;

function css(request, response) {
    if (request.url === "/style.css") {
        response.writeHead(200, {"Content-type":"text/css"});
        var fileContent = fs.readFileSync("./style.css", {encoding: "utf8"});
        response.write(fileContent);
        response.end();
    }
    
}
var renderCV = fs.readFileSync("./cv.html")
var renderAbout = fs.readFileSync("./about.html")

var server = http.createServer(function(request,response){
    css(request, response)
    var q = url.parse(request.url,true)
    if (q.pathname == "/" && request.method == "GET"){
        var keyword = q.query.keyword;
        if (keyword){
            fs.readFile("hasil.html",(error,data)=>{
                if (error){
                    response.writeHead(404,{"Content-Type":"text/html"});
                    return response.end("404 Server Not Found");                
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/html"});
                    response.write(data)
                    response.write("<h2>Pencarian</h2>");
                    response.write("<p>Anda Mencari : <b>" + keyword + "</b> </p>");
                    response.write("<h3><b></b>Tidak ada Hasil ! Maaf Website ini masih dalam tahap pengembangan</b></h3>");
                    response.end("<a class='back' href='/'>Kembali</a>");
                    return response.end()
                }
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
    else if (request.url==="/about" && request.method === "GET"){
        fs.readFile("about.html",(error,data)=>{
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
    else if (request.url==="/regis" && request.method === "GET"){
        fs.readFile("regis.html",(error,data)=>{
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
    else if (request.url==="/regis" && request.method === "POST"){
        
        var requestReg = "";
        request.on("data",function(data){
            requestReg += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestReg);
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(renderHasil)
            response.write('<h1>Anda Berhasil Mendaftar Sebagai :</h1>')
            response.write('<center>'+
            '<table class="kotak">'+
            '<tr>'+
                '<th>'+
                    'Nama '+
                '</th>'+            
                '<td>'+
                    ': '+formData['fname'] +' '+ formData['lname']+
                '</td>'+
    
            '</tr>'+
            '<tr>'+
                '<th>'+
                    'Username '+
                '</th>'+            
                '<td>'+
                    ': '+formData['username']+
                '</td>'+
    
            '</tr>'+
            '<tr>'+
                '<th>'+
                    'Email '+
                '</th>'+            
                '<td>'+
                    ': '+formData['mail']+
                '</td>'+
    
            '</tr>'+
            '<tr>'+
                '<th>'+
                    'Telephone '+
                '</th>'+            
                '<td>'+
                    ': '+formData['tel']+
                '</td>'+
    
            '</tr>'+
            
            '</table>'+
            '</center>'
            );
            response.end()
  
        });

    }

});

server.listen(port);
console.log("server Berjalan")

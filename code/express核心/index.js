/*
    这里是我们的业务模块
*/

/*
    node在启动时会对代码进行初步检测，
    检测代码是否包含错误以及对象是否存在等问题
*/
var express = require("./app");

var app = new express();
/*
    use：
    get：
    post：

*/
app.get("/",function(req,res){
    res.writeHead(200,{"Content-type":"text/plain"});//mime.json文件
    res.end("Hello my homepage2~!");
});

app.get("/dnedu",function(req,res){
    res.writeHead(200,{"Content-type":"text/plain"});//mime.json文件
    res.end("Hello,welcome to dnedu2~!");
});


app.listen(3000);




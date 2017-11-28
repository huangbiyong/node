var Layer = require("./layer");

var Route = function(path){
    this.path = path;
    this.stack = [];
    this.methods = {};//默认为空
}


Route.prototype = {
    _handles_method:function(method){
        console.log("方法："+method);
        var name = method.toLowerCase();//post/get   tolowerCase()  post/get
        return Boolean(this.methods[name]);
    },
    get:function(callback){
        var layer = new Layer("/",callback);
        layer.method = "get";
        this.methods["get"] = true;
        this.stack.push(layer);
        return this;
    },
    dispatch:function(req,res){
        var self = this;
        console.log("dd:"+ req.method);
        var method = req.method.toLowerCase();
        for(var i = 0;i < self.stack.length;i++){
            if(method == self.stack[i].method){
                return self.stack[i].handler_request(req,res);
            }
        }
    }
}

exports = module.exports = Route;





























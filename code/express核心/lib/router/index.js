/*
    Router：负责落实到工作上的
*/

var Layer = require("./layer");
var Route = require("./route");
//分不清route   router  stack是谁的？
var Router = function(){
    //stack是layer
    //this.stack和self.stack是一样的，其属性还是原来的
    this.stack = [new Layer('*',function(req,res){
        res.writeHead(404,{"Content-type":"text/plain"});
        res.end("Cannot " + req.method + ' ' + req.url);
    })];
}

Router.prototype = {
    handle:function(req,res){
        var self = this;//区分作用域，保存this（application）对象
        var method = req.method;//请求类型
        for(var i = 1;i < self.stack.length;i++){
            //最后一个判断：判断是否为get请求
            if(self.stack[i].match(req.url) && self.stack[i].route && self.stack[i].route._handles_method(method)){//匹配一个正在调用的路由
                return self.stack[i].handler_request(req,res);//如果是，则调用handler_request()方法
            }
        }
        return self.stack[0].handler_request(req,res);//默认为星号
    },
    get:function(path,callback){
        var route = this.route(path);
        route.get(callback);
        return this;
    },
    route:function(path){
        var route = new Route(path);
        var layer = new Layer(path,function(req,res){
            route.dispatch(req,res);
        });
        layer.route = route;
        this.stack.push(layer);
        return route;
    }
}

exports = module.exports = Router;


























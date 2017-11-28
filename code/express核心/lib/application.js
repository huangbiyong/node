var http = require("http");
var Router = require("./router");

var Application = function(){//js当中没有明确的构造器概念，都是以首字母大写来区分
    //保存路由
    this._router = new Router();//第一次进来没有执行任何方法
}

Application.prototype = {
    use:function(path,fn){//path:传入的路由名字，fn：传入的路由回调函数
        this.router.push(new Layer(path,fn));
    },
    //单独把方法拿出来讲了，所以和源码中的forEach有所不同，以源码为主
    get:function(path,callback){
        var router = this._router;
        return router.get(path,callback);
    },
    handle:function(req,res){
        var router = this._router;
        router.handle(req,res);
    },
    route:function(path){
        var router = this._router;
        return router.route(path);
    },
    listen:function(port){//端口号的监听
        var self = this;//区分作用域，保存this（application）对象
        http.createServer(function(req,res){
            self.handle(req,res);
        }).listen(Number(port));//判断类型
    }
}

exports = module.exports = Application;

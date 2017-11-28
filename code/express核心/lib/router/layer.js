//如果说没有使用到Promise之类的，会经常使用到回调函数

function Layer(path,fn){
    this.handle = fn;//回调函数
    this.path = path;//
}

Layer.prototype = {
    //注册路由时会有多个回调函数，势必我们多了之后就不知道谁是谁
    handler_request:function(req,res){
        //有可能不存在吧？
        var fn = this.handle;//得到回调函数
        if(fn){
            fn(req,res);//执行回掉函数
        }
    },
    match:function(path){//验证方法
        return path == this.path;
    }

}

exports = module.exports = Layer;






































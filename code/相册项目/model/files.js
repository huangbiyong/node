
var fs = require("fs");
var path = require("path");
var formidable = require("formidable");

exports.getAllAlbums = function (callback) {

    fs.readdir("./uploads", function(err, files){

        if (err) {
            throw err;
            return;
        }

        var allAllbums = [];
        (function iterator(i) {

            if (i >= files.length) {
                callback(allAllbums);
                return;
            }

            fs.stat("./uploads/" + files[i], function (err, data) {
                if (err) {
                    throw err;
                }

                console.log("---------------");
                console.log(data);

                if (data.isDirectory()) {
                    allAllbums.push({name:files[i],isDire:true, path:"./uploads/" + files[i]});
                }else {
                    var extname = path.extname(files[i]).toLowerCase();
                    if (extname == ".jpg" || extname == ".png" || extname == ".jpeg" || extname == ".gif" || extname == ".bmp") {
                        allAllbums.push({name:files[i], isDire:false, path:"uploads/" + files[i]});
                    }
                }
                iterator(i+1);
            });
        })(0);
    });
}

exports.getAllImagesByPhotoName = function(photoName,callback){

    fs.readdir("./uploads/" + photoName,function(err,files){
        if(err){
            callback("没有找到Uploads文件",null);
            return;
        }

        var allImages = [];
        (function iterator(i){//形参
            if(i == files.length){
                //结束了
                callback(null,allImages);
                return;//所有的除了报错可以不写也没关系，其他的时候一定记得加上
            }
            //uploads/当前点击的“相册文件夹”/相册文件
            fs.stat("./uploads/" + photoName + "/" + files[i],function(err,stats){
                if(err){

                    console.log(allImages)
                    callback("找不到文件"+files[i],null);
                    return;
                }
                /*
                    如果需要整个全部显示，那么你判断是否是图片或文件夹，如果二者满足其一，则push到allImages数组，
                */
                if (stats.isDirectory()) {
                    allImages.push({name: files[i],isDire:true, path:"./uploads/" + files[i]});
                }else {
                    var extname = path.extname(files[i]).toLowerCase();
                    if (extname == ".jpg" || extname == ".png" || extname == ".jpeg" || extname == ".gif" || extname == ".bmp") {
                        allImages.push({name: files[i], isDire:false, path:"uploads/" + files[i]});
                    }
                }
                iterator(i+1);
            });
        })(0);


    });


}

exports.uploadFile = function (req, res, callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../tempup/");

    form.parse(req, function (err, fields, files, next) {
        if(err){
            next();
            return;
        }
        callback(fields, files);
    })

}









































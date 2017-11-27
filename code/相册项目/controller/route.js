
var files = require("../model/files.js");
var fs = require("fs");
var sd = require("silly-datetime");
var path = require("path");

exports.showIndex = function (req, res, next) {

    //读取首页文件夹
    //渲染
    files.getAllAlbums(function (allbums) {
        res.render("index",{allbums:allbums});
    })
}

exports.showPhotos = function (req, res, next) {
    //读取首页文件夹
    //渲染
    var photoname = req.params.photoName;
    files.getAllImagesByPhotoName(photoname,function (err, allbums) {
        if(err){
            next();//交给下面的中间件处理
            return;
        }
        res.render("photos",{allbums:allbums, photoname: photoname});
    })
}


exports.showUp = function (req, res, next) {
    //读取首页文件夹
    //渲染
    files.getAllAlbums(function (allbums) {

        //只能是文件夹
        var folders = [];
        for(var i=0;i<allbums.length;i++) {
            if (allbums[i].isDire == true) {
                folders.push(allbums[i]);
            }
        }
        res.render("uploadFile",{folders:folders});
    })
}

exports.doPost = function (req, res, next) {

    files.uploadFile(req, res, function (fields, files) {
        /*
            { uploadfile:
   File {
     domain: null,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     size: 15472017,
     path: '/Users/zhangjian/Pictures/MyCodes/code/tempup/upload_5a4627d746cad33acdb2edfa2906b24f',
     name: '业务支撑系统-2.docx',
     type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
     hash: null,
     lastModifiedDate: 2017-11-25T07:11:21.064Z,
     _writeStream:
      WriteStream {
        _writableState: [Object],
        writable: false,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        path: '/Users/zhangjian/Pictures/MyCodes/code/tempup/upload_5a4627d746cad33acdb2edfa2906b24f',
        fd: null,
        flags: 'w',
        mode: 438,
        start: undefined,
        autoClose: true,
        pos: undefined,
        bytesWritten: 15472017,
        closed: true } } }

        */

        //获取大小
        // var size = parseInt(files.uploadfile,size/1024);
        // if (size > 2000) {
        //     res.send("图片太大了，应该小于1M");//此时已经上传了
        //     fs.unlink(files.uploadfile.path);//删除已经上传的图片
        //     return;
        // }

        //设置名字
        var newDate = sd.format(new Date(), "YYYYMMDDHHmmss");
        var ran = parseInt(Math.random()*100000);
        var extname = path.extname(files.uploadfile.name);
        var oldpath = files.uploadfile.path;

        //拿到指定文件夹的名字
        var folder = fields.foldername;


        var newpath = path.normalize(__dirname + "/../uploads/" + folder + "/" + (newDate+ran+extname));
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                throw  err;
                res.send("失败");
                return;
            }
            res.send("成功");
        });

    });
}








































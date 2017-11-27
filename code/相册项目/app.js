var express = require("express");
var app = express();
var router = require("./controller/route.js");

app.set("view engine","ejs");

app.use(express.static("./public"));
app.use(express.static("./uploads"))


app.get("/", router.showIndex);

app.get("/:photoName", router.showPhotos);

//上传文件
app.get("/uploadFile", router.showUp);
app.post("/uploadFile", router.doPost)


app.listen(3000);
































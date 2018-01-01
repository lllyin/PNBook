let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let recordRouter = require("./recordRouter");

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/record",recordRouter);
app.get("/",function (req,res) {
    res.send("hello world")
});

app.listen(3000,function () {
    console.log('3000端口启动服务')
});


//新增数据
// records.forEach((record)=>{
//     recordModel.create(record,function (err,doc) {
//         if (!err){
//             console.log(doc)
//         }else{
//             console.log(err);
//         }
//     });
// });


//查询所有数据
/*User.find({},function (err,doc) {
    if(!err){
        console.log("所有数据",doc)
    }else{
        console.log(err)
    }
});*/

//删除数据
/*User.remove({age:1232},function (err,doc) {
    if(!err){
        console.log(doc)
    }else{
        console.log(err)
    }
});*/
/*
User.update({name:'liaolunling'},{"$set":{name:'3L先生'}},function (err,doc) {
    if(!err){
        console.log(doc)
    }else{
        console.log(err)
    }
});
*/


//更新数据

let express = require("express");

let app = express();

app.get('/test',function (req,res) {
    res.send('hello world');
});


app.listen(3000,function () {
    console.log('3000端口启动服务')
})
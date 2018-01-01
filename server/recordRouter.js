let recordRouter = require("express").Router();
let models = require("./model");
let recordModel = models.getModel('record');
let _filter = {"__v": 0};    //查询过滤条件
//前端获取数据
recordRouter.get("/", function (req, res) {
    recordModel.find({}, _filter, function (err, doc) {
        res.json(doc);
    })
});

//前端提交数据
recordRouter.post("/", function (req, res) {
    let bodyData = req.body;
    switch (bodyData.type) {
        case 'ADD':
            addRecord(bodyData.data, res);
            break;
        case 'DELETE':
            removeRecord(bodyData.data, res);
            break;
        default:
            break;
    }
});

/*
*   前端提交的数据有2种可能
*   1.增加一条/多条数据
*   2.删除一条/多条数据
*   前端提交数据格式：
*       {
*           type:ADD/DELETE,//需要执行操作
*           data:[""]   //操作数据
*      }
* */

//添加记录
function addRecord(data, res) {
    console.log("add record request");
    data.forEach((record, key) => {
        recordModel.create(record, function (err, doc) {
            if (!err) {
                console.log("添加：",doc);
                if (key === data.length - 1) {
                    res.json({
                        status: 1,
                        msg: "添加成功,"
                    })
                }
            } else {
                res.json({
                    status: 0,
                    msg: "添加失败," + err
                })
            }
        })
    })
}

function removeRecord(data, res) {
    console.log("remove record request");
    data.forEach((record,key) => {
        recordModel.remove(record, function (err, doc) {
            if (!err) {
                console.log("删除：",doc);
                if (key === data.length - 1) {
                    res.json({
                        status: 1,
                        msg: "删除成功。"
                    })
                }
            } else {
                res.json({
                    status: 0,
                    msg: "添加失败," + err
                })
            }
        })
    })
}

module.exports = recordRouter;
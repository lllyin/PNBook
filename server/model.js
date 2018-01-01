const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/pnbook';
//连接数据库
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('connected success');
});

let models = {
    record:{
        type:{type:String,require:true},
        amount:{type:Number,require:true},
        catId:{type:String,require:true},
        timestamp:{type:Number,require:true},
    },
    user:{
        name:String,
        age:Number,
        sex:String
    }
};

for(var m in models){
    mongoose.model(m,new mongoose.Schema(models[m]));
}

module.exports = {
    getModel:function (name) {
        return mongoose.model(name)
    }
};
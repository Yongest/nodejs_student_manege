'use strict';

const path = require('path')

//导入mongodn数据库管理包
//const MongoClient = require('mongodb').MongoClient

const databasemanager = require(path.join(__dirname, '../tools/databasemanager.js'))




// 1.返回笑话数据
exports.joke = (req, res) => {
    databasemanager.findList('joke', {}, function (err, docs) {
        // console.log(docs)
        res.json({
            code:1,
            content:docs,
            msg:'ok'
        })
        
    })
}
// 1.返回笑话数据
exports.studentlist = (req, res) => {
    databasemanager.findList('student', {}, function (err, docs) {
        // console.log(docs)
        res.json({
            code:1,
            content:docs,
            msg:'ok'
        })
        
    })
}

// 2.用户设备数据收集
exports.collect= (req,res)=>{
    var datas = req.body

    var ipAddress;
    var headers = req.headers;
    var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    datas.ip = ipAddress
    console.log( ipAddress);
    var message  = {
        code:0,
        msg:'err'
    }
    //console.log(req.body)
    databasemanager.addOne('deviceInfo', datas, (err, doc)=> {
        if (doc === null) {
            res.json(message)
        } else {
            message.code=1
            message.msg = 'ok'
            res.json(message)
        }
    })
}
'use strict'

const path = require('path')
const fs = require('fs')


const databasemanager = require(path.join(__dirname,'../tools/databasemanager.js'))


//生成登录页面，返回给浏览器
exports.getCollectPage = (req,res)=>{
    fs.readFile(path.join(__dirname,'../views/collect.html'),(err,data)=>{
        res.setHeader('Content-Type','text/html;charset=utf8')
        res.end(data)
    })
}
exports.collectInfo = (req,res)=>{
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
        msg:'添加失败'
    }
    //console.log(req.body)
    databasemanager.addOne('deviceInfo', datas, (err, doc)=> {
        if (doc === null) {
            res.json(message)
        } else {
            message.code=1
            message.msg = '添加成功'
            res.json(message)
        }
    })
}



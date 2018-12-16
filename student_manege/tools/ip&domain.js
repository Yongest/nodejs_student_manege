'use strict';

const path = require('path')

//导入mongodn数据库管理包
//const MongoClient = require('mongodb').MongoClient

const databasemanager = require(path.join(__dirname, '../tools/databasemanager.js'))

// 1获取ip地址
// let getClientIp = function (req) {
//     return req.headers['x-forwarded-for'] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress || '';
// };





exports.studentManegeCtr = (req, res) => {
         // console.log( req.header('time'))
    // console.log(+new Date())
    // console.log(getClientIp(req));
    // let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
    // console.log(ip);

    // 3.获取域名
    // let domain = req.headers['referer'].match(/^(\w+:\/\/)?([^\/]+)/i);
    // domain = domain ? domain[2].split(':')[0].split('.').slice(-2).join('.') : null;
//    console.log(domain)
    // 4.域名判断
    // console.log(req.headers.referer)
    // if (req.headers.referer && (req.headers.referer==='http://mingyi.free.idcfengye.com/' ||req.headers.referer=== 'http://192.168.1.102/' ||req.headers.referer=== 'http://localhost:8080/'  ||req.headers.referer=== 'http://thingking.cn/')) {
        
    // }else {
    //     res.json({
    //         code: 0,
    //         msg: '无权限访问！'
    //     })
    //     return false;
    // }
    

}
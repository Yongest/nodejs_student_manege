'use strict'

const path = require('path')
const fs = require('fs')
//导入生成验证码的包
const captchapng = require('captchapng')


const databasemanager = require(path.join(__dirname,'../tools/databasemanager.js'))


//生成登录页面，返回给浏览器
exports.getLoginPage = (req,res)=>{
    fs.readFile(path.join(__dirname,'../views/login.html'),(err,data)=>{
        res.setHeader('Content-Type','text/html;charset=utf8')
        res.end(data)
    })
}

//生成验证码，并且返回给浏览器
exports.getQrcode = (req,res)=>{
    const qrcode = parseInt(Math.random()*9000+1000)
//利用我们刚刚开辟的内存空间，存储我们验证码数字
    req.session.qrcode = qrcode

 var p = new captchapng(80,30,qrcode)  // width,height,numeric captcha
    p.color(0, 0, 0, 0)  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255) // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64()
    var imgbase64 = new Buffer(img,'base64')
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64)
}
//处理登陆请求
exports.login  = (req,res)=>{
    //1.获取浏览器传递过来的验证码
   const vcode1 = parseInt(req.body.vcode || '')
    //2.获取存储在session中的验证码
    const vcode2 = req.session.qrcode
    //设定成功之后的结果
    var result = {status:0,message:'登陆成功'}
    console.log(vcode1)
    console.log(vcode2)
    if(vcode1!==vcode2){
        result.status = 1
        result.message = '验证码错误'
        res.json(result)

        return
    }
    //databasemanager.findOne
    databasemanager.findOne('account',{username:req.body.username,password:req.body.password},(err,doc)=>{

       console.log(doc,2222222222)

       if(doc===null){
           //console.log('err')
           result.status = 2
           result.message= "用户名或者密码错误"
       }else {
           req.session.loginname = req.body.username
       }

       res.json(result)
   })

}

exports.logout = (req,res)=>{
    req.session.loginname = null;
    res.setHeader('Content-Type','text/html;charset=utf8')
     res.end('<script>location.href="/account/login"</script>>')
}

exports.getRegisterPage = (req,res)=>{
    fs.readFile(path.join(__dirname,'../views/register.html'),(err,data)=>{
        res.setHeader('Content-Type','text/html;charset=utf8')
        res.end(data)
    })
}


exports.registerUser=(req,res)=>{
    databasemanager.addOne('account',req.body,(err,doc)=>{
        var result = {status:1,message:"注册成功！"}

        if(doc==null){
            result.status = 0
            result.message = '注册失败！'
        }
        //res.setHeader('Content-Type','text/html;charset=utf8')
         res.json(result)
    })
}
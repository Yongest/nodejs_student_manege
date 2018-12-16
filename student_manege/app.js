'use strict'
//1.导包
const express = require('express')
const path = require('path')
//2.创建app
const app = express()
//
const bodyParser  = require('body-parser')
//import the session middleware,服务器开辟内存空间的技术方案
const session = require('express-session')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded( { useNewUrlParser: true }))
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


    //设置静态资源跟路径
    app.use(express.static(path.join(__dirname,'statics')))

//权限验证
app.all('/*',(req,res,next)=>{
     // console.log(req.headers)
    //2设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    // res.header("Access-Control-Allow-Headers","content-type","time");
    //跨域允许的请求方式 
    // res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    // console.log(req)




   var urlString = req.url;
    console.log(urlString)
    if(urlString.includes('account') ||urlString.includes('collect') ||urlString.includes('/') ){
        console.log(1)
        next()

    }else {
        if(req.session.loginname){
            console.log(2)
            //req.session.loginname = req.session.loginname
            next()
        }else {
            console.log(3)
            res.setHeader('Content-Type','text/html;charset=utf8')
             res.end('<script>alert("请先登录！");location.href="/account/login"</script>')
        }
    }
  
})

//3.当访问/account 的时候，交给accountRouter
//请求处理响应
const accountRouter = require(path.join(__dirname,'routers/account_router.js'))
app.use('/account',accountRouter)


//5.当访问/account 的时候，交给studentManageRouter
//请求处理响应
const studentManageRouter = require(path.join(__dirname,'routers/student_manege_router.js'))
app.use('/student_manager',studentManageRouter)




// 8.各种数据返回
const apiRouter = require(path.join(__dirname,'routers/api_router.js'))
app.use('/api',apiRouter)

//4.开启web服务
//app.listen(80,'192.168.15.102',err=>{
app.listen(80,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }
    console.log('start ok')

})
'use strict'

const express = require('express')
const path = require('path')

const accountRouter = express.Router()

const accountContr = require(path.join(__dirname,'../controllers/account_controller.js'))

//获取登陆页面的处理
accountRouter.get('/login',accountContr.getLoginPage)
//获取验证码图片的逻辑
accountRouter.get('/vcode',accountContr.getQrcode)

//处理登陆请求
accountRouter.post('/login',accountContr.login)
//退出功能
accountRouter.get('/logout',accountContr.logout)


//获取注册页面
accountRouter.get('/register',accountContr.getRegisterPage)
//注册功能
accountRouter.post('/register',accountContr.registerUser)

module.exports = accountRouter
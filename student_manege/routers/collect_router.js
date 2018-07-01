'use strict'

const express = require('express')
const path = require('path')

const collectRouter = express.Router()

const collectCtr = require(path.join(__dirname,'../controllers/collect_controller.js'))

//获取登陆页面的处理
collectRouter.get('/collection',collectCtr.getCollectPage)

//处理登陆请求
collectRouter.post('/collection',collectCtr.collectInfo)


module.exports = collectRouter
'use strict'

const express = require('express')
const path = require('path')

const collectRouter = express.Router()

const collectCtr = require(path.join(__dirname,'../controllers/collect_controller.js'))

//��ȡ��½ҳ��Ĵ���
collectRouter.get('/collection',collectCtr.getCollectPage)

//�����½����
collectRouter.post('/collection',collectCtr.collectInfo)


module.exports = collectRouter
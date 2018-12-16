'use strict'

const express = require('express')
const path = require('path')
const apiRouter = express.Router()

const apiCtr = require(path.join(__dirname,'../controllers/api_controller.js'))
// 1.return joke
apiRouter.get('/joke',apiCtr.joke)
// 2. collect info
apiRouter.post('/collect',apiCtr.collect)

// 3.return studentlist
apiRouter.get('/studentlist',apiCtr.studentlist)


module.exports = apiRouter

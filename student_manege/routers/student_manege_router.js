'use strict'

const express = require('express')
const path = require('path')
const studentRouter = express.Router()

const studentManegeCtr = require(path.join(__dirname,'../controllers/student_manege_controller.js'))

studentRouter.get('/list',studentManegeCtr.studentManegeCtr)
studentRouter.get('/add',studentManegeCtr.getAddPage)
//新增添加学生功能
studentRouter.post('/add',studentManegeCtr.addStudent)

//获取学生页面
studentRouter.get('/edit/:studentId',studentManegeCtr.getEditPage)

//修改学生
studentRouter.post('/edit/:studentId',studentManegeCtr.editStudent)

//删除学生
studentRouter.get('/delete/:studentId',studentManegeCtr.deleteStudent)

module.exports = studentRouter

'use strict';

const path = require('path')
//const fs = require('fs')
var xtpl = require('xtpl');

//导入mongodn数据库管理包
//const MongoClient = require('mongodb').MongoClient

const databasemanager = require(path.join(__dirname, '../tools/databasemanager.js'))

exports.studentManegeCtr = (req, res)=> {

    const keyword = req.query.keyword || '';


    databasemanager.findList('student', {name: {$regex: keyword}}, function (err, docs) {
        xtpl.renderFile(path.join(__dirname, '../views/student_list.html'), {
            studentlist: docs,
            keyword: keyword,
            loginedname:req.session.loginname


        }, function (error, content) {
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end(content)
        });
    })

    /*  //连接数据库
     // Connection URL
     const url = 'mongodb://localhost:27017'
     // Database Name
     const dbName = 'meili'
     // Use connect method to connect to the server
     MongoClient.connect(url, function(err, client) {
     const db = client.db(dbName);
     // Get the documents collection
     const collection = db.collection('studentlist');
     //console.log(req.body)
     collection.find({name:{$regex:keyword}}).toArray((err, doc)=> {  //模糊查询
     console.log(doc)
     client.close()


     xtpl.renderFile(path.join(__dirname,'../views/student_list.html'),{studentlist:doc,keyword:keyword},function(error,content){
     res.setHeader('Content-Type','text/html;charset=utf8')
     res.end(content)
     });
     });
     })*/

}

exports.getAddPage = (req, res)=> {

    xtpl.renderFile(path.join(__dirname, '../views/add.html'), {loginedname:req.session.loginname}, (err, content)=> {

        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end(content)
    })
}


exports.addStudent = (req, res)=> {
    databasemanager.addOne('student', req.body, (err, doc)=> {
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        if (doc === null) {
            res.end('<script>alert("添加失败")</script>script>')
        } else {
            res.end('<script>location.href="/student_manager/list"</script>script>')
        }
    })
}

exports.getEditPage = (req, res)=> {
    var studentId = req.params.studentId
    databasemanager.findOne('student', {_id: databasemanager.ObjectId(studentId)}, (err, doc)=> {

        xtpl.renderFile(path.join(__dirname, '../views/edit.html'), {student: doc,loginedname:req.session.loginname}, (err, content)=> {

            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end(content)
        })
    })
}

exports.editStudent = (req, res)=> {
    var studentId = req.params.studentId
    databasemanager.updateOne('student', {_id: databasemanager.ObjectId(studentId)}, req.body, (err, doc)=> {
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        //console.log(doc)
        if (doc === null) {
            res.end('<script>alert("修改失败")</script>script>')
        } else {
            res.end('<script>location.href="/student_manager/list"</script>script>')
        }

    })
}

exports.deleteStudent = (req, res)=> {
    var studentId = req.params.studentId

    var result = {code: 1, message: "删除成功"}
    databasemanager.deleteOne('student', {_id: databasemanager.ObjectId(studentId)}, (err, doc)=> {
        if (doc === null) {
            result.code === 0
            result.message = "删除失败"
        }
        //res.setHeader('Content-Type', 'text/html;charset=utf8')  怎么
        res.json(result)

    })
}


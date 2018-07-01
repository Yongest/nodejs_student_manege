'use strict'

/*
* 1.跟控制器打交道
* 2.暴露一些常用方法给控制器
* */

//导入mongodn数据库管理包
const Mongo = require('mongodb')
const MongoClient = Mongo.MongoClient
exports.ObjectId = Mongo.ObjectId


// Connection URL
const url = 'mongodb://localhost:27017'
// Database Name
const dbName = 'meili'

//抽取获取数据库db对象
function getDB(callBack){
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        if(err){
            console.log(err)
        }
        const db = client.db(dbName);

        callBack(db,client)

    })
}
exports.findOne = (collectionName,condition,callback)=>{
    getDB(function (db,client) {
        //console.log(db)
        db.collection(collectionName).findOne(condition,(err,doc)=>{
            client.close();

            //通过回调，把数据库中的数据传给控制器去处理
            callback(err,doc)

        })
    })
}

exports.findList = (collectionName,condition,callback)=>{
    getDB((db,client)=> {
        //console.log(db)
        db.collection(collectionName).find(condition).toArray((err,docs)=>{
            client.close()
            //console.log(docs)
            callback(err,docs)
        })
    })
}

exports.addOne = (collectionName,condition,callback)=>{
    getDB((db,client)=> {
        //console.log(db)
        db.collection(collectionName).insertOne(condition,(err,doc)=>{
            client.close()

            callback(err,doc)
        })
    })
}

exports.updateOne = (collectionName,condition,data,callback)=>{
    getDB((db,client)=> {
        //console.log(db)
        db.collection(collectionName).updateOne(condition,{$set:data},(err,doc)=>{
            client.close()

            callback(err,doc)
        })
    })
}

exports.deleteOne = (collectionName,condition,callback)=>{
    getDB((db,client)=> {

        db.collection(collectionName).deleteOne(condition,(err,doc)=>{
            client.close()

            callback(err,doc)
        })
    })
}
const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
const connection = require('../database/db')

router.post('/id', (req, res) => {
    const id = req.body.id
    const responsedata ={}
    const query = connection.query('select * from user where id = "' + id + '"',(err,rows)=>{
        if(err) throw err;
        if(rows[0]){
            console.log(rows)
            responsedata.id = rows[0].id
            responsedata.result = 'OK'
        } else {
            console.log("데이터가 없습니다")
            responsedata.result = 'NONE'
            responsedata.id = ''
        }
        res.json(responsedata)
    })
})

router.post('/name', (req, res) => {
    const name = req.body.name
    const responsedata ={}
    const query = connection.query('select * from user where name = "' + name + '"',(err,rows)=>{
        if(err) throw err;
        if(rows[0]){
            console.log(rows)
            responsedata.name = rows[0].name
            responsedata.result = 'OK'
        } else {
            console.log("데이터가 없습니다")
            responsedata.result = 'NONE'
            responsedata.name = ''
        }
        res.json(responsedata)
    })
})

module.exports = router
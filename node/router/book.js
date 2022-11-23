//图书信息管理

//导入express
const express = require("express");

//导入路由模块
const router = express.Router()

const bookInfoHandle = require('../router_hanlder/book')

//查询图书信息
router.get('/showBookInfo',bookInfoHandle.showBookInfo)

//新增图书信息
router.post('/insertBookInfo',bookInfoHandle.insertBookInfo)

//修改图书状态
router.post('/updateBookState',bookInfoHandle.updateBookState)

//修改图书为已借出
router.post('/updateLent',bookInfoHandle.updateLent)

module.exports = router
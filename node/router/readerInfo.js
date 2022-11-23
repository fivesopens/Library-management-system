//读者信息管理
const express = require("express");

//创建路由对象
const router = express.Router()

//导入读者信息模块
const readerInfoHanlder = require('../router_hanlder/readerInfo')

//展示读者信息
router.get('/showReaderInfo',readerInfoHanlder.showReaderInfo)

//添加读者信息
router.post('/insertReadInfo',readerInfoHanlder.insertReadInfo)

//删除读者信息
router.post('/delReadInfo',readerInfoHanlder.delReadInfo)

//更新读者信息
router.post('/updateReadInfo',readerInfoHanlder.updateReadInfo)

//检查读者id是否存在
router.post('/checkId',readerInfoHanlder.checkId)


//返回读者的信息
router.post('/returnInfo',readerInfoHanlder.returnInfo)


//超过归还时间增加罚款
router.post('/updatePenalty',readerInfoHanlder.updatePenalty)

//缴纳罚款
router.post('/payPenalty',readerInfoHanlder.payPenalty)

module.exports = router
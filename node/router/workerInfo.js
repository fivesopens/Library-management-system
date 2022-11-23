//职工信息管理
const express = require("express");

//创建路由对象
const router = express.Router()

//导入用户信息展示模块
const showWorkInfoHandler = require('../router_hanlder/workerInfo')

router.get('/showWorkInfo',showWorkInfoHandler.showWorkInfo)

//添加员工信息
router.post('/insertWorkInfo',showWorkInfoHandler.insertWorkInfo)

//更新员工信息
router.post('/updateWorkInfo',showWorkInfoHandler.updateWorkInfo)


//删除员工信息
router.post('/delWorkInfo',showWorkInfoHandler.delWorkInfo)

//修改状态
router.post('/updateState',showWorkInfoHandler.updateState)

module.exports = router

//借阅管理模块
const express = require('express')

//创建路由模块
const router = express.Router()

//导入借阅管理信息模块
const borrowHandle = require('../router_hanlder/borrow')

//添加借书信息
router.post('/insertBorrow',borrowHandle.insertBorrow)

//查询借书信息
router.post('/showBorrow',borrowHandle.showBorrow)

//修改书本归还时间
router.post('/updateReturnBook',borrowHandle.updateReturnBook)

//判断是否有借书信息存在
router.post('/isBorrow',borrowHandle.isBorrow)

//修改借书时间
router.post('/updateBorrow',borrowHandle.updateBorrow)

module.exports = router
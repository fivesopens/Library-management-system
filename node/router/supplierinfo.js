//供应商信息管理
const express = require("express");

//创建路由对象
const router = express.Router()

//导入供应商信息模块
const supplierInfoHandler = require('../router_hanlder/supplierinfo')

//展示供应商信息
router.get('/showSupplierInfo',supplierInfoHandler.showSupplierInfo)

//增加供应商信息
router.post('/insertSupplierInfo',supplierInfoHandler.insertSupplierInfo)

//删除供应商信息
router.post('/delSupplierInfo',supplierInfoHandler.delSupplierInfo)

//跟新供应商信息
router.post('/updateSupplierInfo',supplierInfoHandler.updateSupplierInfo)

//检查id是否相同
router.post('/check',supplierInfoHandler.check)

module.exports = router
//罚款信息查询模块
const express = require("express");

///导入路由模块
const router = express.Router()

//导入罚款信息查询
const PenaltyHanlder = require('../router_hanlder/Penalty')

//展示罚款信息
router.post('/showPenalty',PenaltyHanlder.showPenalty)

module.exports = router

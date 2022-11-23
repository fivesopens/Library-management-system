const express = require("express");

//创建路由对象
const router = express.Router()

//导入管理员登录处理函数模块
const loginHandler = require('../router_hanlder/login')

router.post('/login',loginHandler.login)

module.exports = router
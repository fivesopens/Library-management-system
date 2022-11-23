const express = require("express");
const app = express()
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{

    console.log('有人请求服务器了');
    console.log('请求来自于',req.get('Host'));
    console.log('请求的地址',req.url);
    next()
 })

//导入登录模块
const loginRouter = require('./router/login')
app.use('/api',loginRouter)

//导入职工信息模块
const showWorkInfoRouter = require('./router/workerInfo')
app.use('/api',showWorkInfoRouter)

//导入读者信息管理模块
const readersInfoRouter = require('./router/readerInfo')
app.use('/api',readersInfoRouter)

//导入供应商信息模块
const supplierinfoRouter = require('./router/supplierinfo')
app.use('/api',supplierinfoRouter)

//导入罚款信息模块
const PenaltyRouter = require('./router/Penalty')
app.use('/api',PenaltyRouter)

//导入图书信息管理模块
const bookInfoRouter = require('./router/book')
app.use('/api',bookInfoRouter)


//导入借阅管理模块
const borrowRouter = require('./router/borrow')
app.use('/api',borrowRouter)

//开启服务器
app.listen(80,()=>{
    console.log('http://127.0.0.1')
})
// 借阅信息管理模块

//导入数据库
const db = require('../db/index')

//添加借书信息
exports.insertBorrow=(req,res)=>{
    const info={
        userId:req.body.userId,
        booksId:req.body.booksId,
        borrowingTime:req.body.borrowingTime,
        returnTime:req.body.returnTime
    }
    const sql = `INSERT into borrowingtable SET ?`
    db.query(sql,info,(err,results)=>{
        if(err){
            console.log(err.message)
        }

        if(results.affectedRows !==1){
            res.send({state:'0',message:'失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'书本已借出'})
        }
    })
}

//查询借书信息
exports.showBorrow=(req,res)=>{
    console.log(req.body.booksId)
    const sql=`SELECT usertable.userId,userName,bookstable.booksId,booksName,borrowingTime,returnTime FROM borrowingtable,usertable,bookstable 
    WHERE  borrowingtable.userId = usertable.userId  AND borrowingtable.booksId  = bookstable.booksId  AND bookstable.booksId = ?`
    db.query(sql,req.body.booksId,(err,results)=>{
        if(err){
            console.log(err.message)
        }

        if(results.length>0){
            res.send({state:'1',results:results})
        }else{
            res.send({state:'0',message:'暂无借阅信息'})
        }
    })
}


//修改还书时间
exports.updateReturnBook=(req,res)=>{
    console.log(req.body.returnTime)
    const sql = `UPDATE borrowingtable SET returnTime=? WHERE booksId=?`
    db.query(sql,[req.body.returnTime,req.body.booksId],(err,results)=>{
        if(err){
            console.log(err.message)
        }
        if(results.affectedRows >0){
             res.send('ok')
        }
    })
}

//判断是否有借书信息存在
exports.isBorrow=(req,res)=>{
   
    console.log(req.body)
    const sql = `SELECT * FROM borrowingtable WHERE booksId = ?`
    db.query(sql,[req.body.booksId],(err,results)=>{
        if(err){
            console.log(err.message)
        }
        if(results.length>0){
            res.send({state:'1'})
        }else{
            res.send({state:'0'})
        }
    })
}


//修改借书信息
exports.updateBorrow=(req,res)=>{
    console.log(req.body)
    const updates = {
       userId:req.body.userId,
       borrowingTime:req.body.borrowingTime,
       returnTime:req.body.returnTime
    }
    const sql = `UPDATE borrowingtable SET ? WHERE booksId = ?`
    db.query(sql,[updates,req.body.booksId],(err,results)=>{
        if(err){
            console.log(err.message)
        }

        if(results.affectedRows !==1){
            res.send({state:'0',message:'失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'书本已借出'})
        }

    })
}
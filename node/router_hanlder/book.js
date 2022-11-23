//图书信息管理

//导入数据库
const db = require('../db/index')

//查询图书信息
exports.showBookInfo=(req,res)=>{
    const sql= `SELECT * from bookstable`
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err.message)
        }

        res.send(results)
    })
}


//新增图书信息
exports.insertBookInfo=(req,res)=>{
    const sql='INSERT into bookstable SET ?'
    const data ={
        booksId:req.body.id,
        booksName:req.body.name,
        booksAuthor:req.body.author,
        supplierName:req.body.press,
        booksState:'未借出',
        ISBN:1,
    }

    db.query(sql,data,(err,results)=>{
        if(err){
            console.log(err.message)
        }

        if(results.affectedRows !==1){
            res.send({state:'0',message:'添加失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'添加成功'})
        }
    })
}

//修改图书状态
exports.updateBookState=(req,res)=>{
    const sql = 'UPDATE bookstable SET booksState = ? WHERE booksId=?'
    db.query(sql,[req.body.booksState,req.body.booksId],(err,results)=>{
        if(err){
            console.log(err.message)
        }
 
        if(results.affectedRows !==1){
            res.send({state:'0',message:'更新失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'图书状态已更新'})
        }
    })
}

//修改图书为已借出
exports.updateLent=(req,res)=>{
   const sql = 'UPDATE bookstable SET booksState = ? WHERE booksId=?' 
   db.query(sql,[req.body.booksState,req.body.booksId],(err,results)=>{
    if(err){
        console.log(err.message)
    }

    if(results.affectedRows !==1){
        res.send({state:'0',message:'更新失败,请联系管理员'})
    }else{
        res.send({state:'1',message:'图书状态已更新'})
    }
})
}

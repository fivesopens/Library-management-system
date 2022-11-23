//读者信息管理模块

//导入数据库
const res = require('express/lib/response')
const db = require('../db/index')

//展示读者信息接口
exports.showReaderInfo=(req,res)=>{
    const sql = 'SELECT * FROM usertable'
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err.message)
        }

        res.send(results)
    })
}

//添加读者信息模块
exports.insertReadInfo=(req,res)=>{
     
    const readerInfo = req.body
    const sql = `INSERT into usertable SET ?`
    db.query(sql,readerInfo,(err,results)=>{
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


//修改读者信息模块
exports.updateReadInfo=(req,res)=>{
  const sql = `UPDATE usertable SET ? WHERE userId = ?`
  let update={userPhone:req.body.userPhone,}
  console.log(req.body)
  db.query(sql,[update,req.body.userId],(err,results)=>{
       if(err){
           console.log(err.message)
       }

       if(results.affectedRows !==1){
           res.send({state:'0',message:'更新失败,请联系管理员'})
       }else{
           res.send({state:'1',message:'更新成功'})
       }
  })
}

//超过归还时间增加罚款
exports.updatePenalty=(req,res)=>{
    const sql = `UPDATE usertable SET ? WHERE userId = ?`
     let update = {Penalty:req.body.Penalty}
    db.query(sql,[update,req.body.userId],(err,results)=>{
         if(err){
             console.log(err.message)
         }
  
         if(results.affectedRows !==1){
             res.send({state:'0',message:'更新失败,请联系管理员'})
         }else{
             res.send({state:'1',message:'还书成功,已更新欠款金额'})
         }
    })
  }

//删除读者信息模块
exports.delReadInfo=(req,res)=>{
   const sql = `delete from usertable where userId=?`
   db.query(sql,req.body.userId,(err,results)=>{
       if(err){
           console.log(err.message)
       }

        if(results.affectedRows !==1){
        res.send({state:'0',message:'删除失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'删除信息成功'})
        }
   })
  
}


//判断读者id是否存在
exports.checkId=(req,res)=>{
    const sql = `SELECT * FROM usertable where userId=?`
    db.query(sql,[req.body.userId],(err,results)=>{
        if(err){
            console.log(err.message)
        }

        if(results.length>0){
            res.send({state:'1',message:'读者卡号已存在,请输入其它卡号'})
        }
        
    })
}

//返回读者的信息
exports.returnInfo=(req,res)=>{
    const sql = `SELECT userId,userName,userSex,Penalty FROM usertable where userId=?`
    db.query(sql,[req.body.userId],(err,results)=>{
        if(err){
            console.log(err.message)
        }

        if(results.length>0){
            res.send({state:'1',results:results})
        }else{
            res.send({state:'0',message:'暂无读者信息'})
        }
        
    })
}

//缴纳罚款
exports.payPenalty=(req,res)=>{
    const sql = `UPDATE usertable SET ? WHERE userId = ?`
    if(req.body.Penalty>0){
       let update = {Penalty:0}
       db.query(sql,[update,req.body.userId],(err,results)=>{
        if(err){
            console.log(err.message)
        }
 
        if(results.affectedRows !==1){
            res.send({state:'0',message:'缴纳失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'缴纳成功,已更新欠款金额'})
        }
      })
    }else{
        res.send('缴纳金额不正确请重新输入')
    }
   
  
}
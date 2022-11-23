//供应商信息管理模块

//导入数据库
const db = require('../db/index')

//展示供应商信息
exports.showSupplierInfo=(req,res)=>{
    const sql = `SELECT * FROM supplierstable`
    db.query(sql,(err,resluts)=>{
        if(err){
            console.log(err.message)
        }
        
        res.send(resluts)
    })
}

//增加供应商信息
exports.insertSupplierInfo=(req,res)=>{
    const SupplierInfo = req.body
    const sql = `INSERT into supplierstable SET ?`
    db.query(sql,req.body,(err,results)=>{
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

//删除供应商信息
exports.delSupplierInfo=(req,res)=>{
    const sql = `delete from supplierstable where suppliersId=?`
    db.query(sql,[req.body.suppliersId],(err,results)=>{
        if(err){
            console.log(err.message)
        }

        if(results.affectedRows !==1){
            res.send({state:'0',message:'删除失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'删除成功'})
        }
    })
}

//更新供应商信息
exports.updateSupplierInfo=(req,res)=>{
    const sql='UPDATE supplierstable SET ? WHERE suppliersId = ?'
    console.log(req.body)
    db.query(sql,[req.body,req.body.suppliersId],(err,results)=>{
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
//检查id是否相同
exports.check=(req,res)=>{
   const sql = `SELECT * FROM supplierstable WHERE suppliersId =?`
   console.log(req.body)
   db.query(sql,[req.body.suppliersId],(err,results)=>{
       if(err){
           console.log(err.message)
       }

       if(results.length>0){
           res.send({state:'1',message:'供应商号已存在'})
       }
   })
}
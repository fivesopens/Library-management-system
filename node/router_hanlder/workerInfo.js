//职工信息管理处理函数

//导入数据库模块
const db = require('../db/index')

//展示职工信息操作接口
exports.showWorkInfo=(req,res)=>{
    const sql = `SELECT workerId,workerName,workerAge,adminSex,adminPhone,Post,Permissions,Sate from admintable`
    db.query(sql,(err,results)=>{
        if(err){
            return console.log(err.message)
        }
           res.send(results)
    })
} 

//插入职工信息接口
exports.insertWorkInfo=(req,res)=>{
    const workerInfo = req.body
    
    const workerData = {
        workerId:workerInfo.workerId,
        workerPwd:workerInfo.workerPwd,
        workerName:workerInfo.workerName,
        workerAge:workerInfo.workerAge,
        adminSex:workerInfo.adminSex,
        adminPhone:workerInfo.adminPhone,
        Post:workerInfo.Post,
        Permissions:workerInfo.Permissions,
        Sate:workerInfo.Sate
    }
    const sql = `INSERT into admintable SET ?`
    db.query(sql,workerData,(err,results)=>{
        if(err){
            return console.log(err.message)
        }

        if(results.affectedRows !==1){
            res.send({state:'0',message:'添加失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'添加成功'})
        }
    })
}


//更新职工信息接口
exports.updateWorkInfo=(req,res)=>{
    const workerInfo = req.body
    const sql = `UPDATE admintable SET ? WHERE workerId = ?`
    const updates = {
        adminPhone:workerInfo.adminPhone,
        Post:workerInfo.Post,
        Permissions:workerInfo.Permissions,
        Sate:workerInfo.Sate
    }
    db.query(sql,[updates,req.body.workerId],(err,results)=>{
        if(err){
            return console.log(err)
        }
        if(results.affectedRows !==1){
            res.send({state:'0',message:'修改失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'修改成功'})
        }
    })
}

//删除员工信息
exports.delWorkInfo=(req,res)=>{

    const sql = `delete from admintable where workerId=?`
    db.query(sql,req.body.workerId,(err,results)=>{
       
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

//修在在职状态
exports.updateState=(req,res)=>{
    const sql = `UPDATE admintable SET ? WHERE workerId = ?`
    db.query(sql,[req.body,req.body.workerId],(err,results)=>{
        if(err){
            return console.log(err)
        }
        if(results.affectedRows !==1){
            res.send({state:'0',message:'修改失败,请联系管理员'})
        }else{
            res.send({state:'1',message:'修改成功'})
        }
    })
}
//登录的处理函数

//导入数据库操作模块
const db = require('../db/index')

//管理员登录接口
exports.login = (req,res)=>{
    const usermsg = req.body
    //判断密码或用户名是否为空
    if(!usermsg.usesId|| !usermsg.userPwd){
        return res.send({status:1,message:'用户名或密码不能为空'})
    }
    // const sql = `SELECT * FROM admain WHERE admin = ?`
    // //判断用户名是否存在
    // db.query(sql,usermsg.userName,(err,resluts)=>{
    //     if(err){
    //         return console.log(err.message)
    //     }
    //     if(resluts.length>0){
    //         return res.send("用户名已存在,请更换")
    //     }
    // })
    const sql = `SELECT * from admintable WHERE workerId = ? AND workerPwd = ?`
    db.query(sql,[usermsg.usesId,usermsg.userPwd],(err,resluts)=>{
        if(err){
            return console.log(err.message)
        }
        if(resluts.length>0){
            return res.send({status:0,message:'登录成功',Permission:resluts[0].Permissions,workName:resluts[0].workerName})
        }
        else{
            return res.send({status:1,message:'登录失败,用户名或密码错误'})
        }
    })
}
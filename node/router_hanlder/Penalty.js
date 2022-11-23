//罚款信息查询

//导入数据库操作模块
const db = require('../db/index')

//展示罚款信息
exports.showPenalty=(req,res)=>{
    //const sql = `SELECT userId,userName,booksId,booksName,Penalty FROM usertable,bookstable WHERE  usertable.userId = ?`
    const sql = `SELECT usertable.userId,userName,bookstable.booksId,booksName,Penalty FROM 
                usertable,bookstable,borrowingtable 
                WHERE usertable.userId = borrowingtable.userId AND 
                bookstable.booksId = borrowingtable.booksId AND 
                usertable.userId = ? 
                GROUP BY bookstable.booksId`
    db.query(sql,[req.body.userId],(err,results)=>{
        if(err){
            console.log(err.message)
        }
        res.send(results)
    })
}


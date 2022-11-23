<template>
  <div>
    <h1>罚款信息查询</h1>
    <el-input
    placeholder="请输入读者卡号"
    v-model.number="input"
    clearable>
    </el-input>
    <el-button type="primary" icon="el-icon-search" @click="showInfo">查询</el-button>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="userId"
      label="读者卡号"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="姓名"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="booksId"
      label="图书编号"
      width="180"
      align="center" >
    </el-table-column>
    <el-table-column
      prop="booksName"
      label="图书名"
      width="180"
      align="center" >
    </el-table-column>
    <el-table-column
      prop="Penalty"
      label="欠款金额"
      width="180"
      align="center" >
    </el-table-column>
    <el-table-column
    label="操作"
    width="auto">
        <template slot-scope="scope">
            <el-button type="text" size="medium" @click="showPen(scope.$index,tableData)">缴纳罚款</el-button>
        </template>
    </el-table-column>
    </el-table>


     <el-dialog
    title="缴纳罚款"
    :visible.sync="dialogVisible"
    width="30%"
    top="10vh"
    height="30%"
    :before-close="handleClose">
    <div class="item">
       <el-input v-model.number="Pentily" placeholder="请输入要缴纳的罚款金额"></el-input>
        <el-button type="primary" @click="updatePen">确 定</el-button>
    </div>
        
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name:'Penalty',
  data() {
      return {
         formLabelWidth: '120px',
         dialogVisible:false,
         input:'',
         userId:'',
         Pentily:'',
         tableData: [],
      }
  },
  methods: {
    
     handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },

    

    showPen(index,rows){
      this.dialogVisible=true
      this.userId=rows[index].userId
    },
    
    updatePen(){
      axios.post(`/api/payPenalty`,qs.stringify({Penalty:this.Pentily,userId:this.userId})).then(
         response=>{
            if(response.data.state=='1'){
                this.$message({
                  message:response.data.message,
                  type:'success',
                  duration:1000
                })
                setTimeout(()=>{
                  this.$router.go(0)
                },500) 
            }else{
              this.$message.error(response.data);
            }
         },
         error=>{
           console.log('请求失败',error.message)
         }
      )
    },

    showInfo(){
      axios.post('/api/showPenalty',qs.stringify({userId:this.input})).then(
        response=>{
          this.tableData = response.data
        },
        error=>{
          console.log('请求失败',error.message)
        }
      )
      this.input=""
    }
  },
}
</script>

<style scoped>
  .el-input{
      float: left;
      width: 300px;
  }
  div .el-button{
      margin-left: 10px;
      float: left;
  }

.item{
   padding: 0px 0px 40px 70px;
}
</style>
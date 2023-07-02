<template>
  <el-card class="box-card">
    <h1>欢迎使用图书馆管理系统</h1>
     <el-input placeholder="请输入账号" v-model.number="userId" clearable  prefix-icon="el-icon-user-solid"></el-input>
     <el-input placeholder="请输入密码" v-model="userPwd" prefix-icon="el-icon-s-tools" show-password></el-input>
     <div class="check">
      <el-radio v-model="radio" label="1">管理员</el-radio>
      <el-radio v-model="radio" label="2">职工</el-radio>
     </div>
     <el-button type="primary" :plain="true" @click="loginMain">登录</el-button>
 </el-card>

</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
   name:'Login',
   data() {
      return {
         userId:'',
         userPwd:'',
         radio: '1',
      }
   },
   methods: {
      loginMain(){
         let _this = this
         //管理员登录
        if(_this.radio=='1'){
            axios.post('/api/login',qs.stringify({usesId:_this.userId,userPwd:_this.userPwd})).then(
               response =>{
                  if(response.data.status==1){
                     this.$message.error(response.data.message);
                  }else{
                     //判断账号是否是管理员
                     if(response.data.Permission =='管理员'&&_this.radio=='1'){
                           sessionStorage.setItem('workname',response.data.workName)
                           sessionStorage.setItem('Permission',response.data.Permission)
                           this.$message({
                           message:response.data.message,
                           type:'success',
                           duration:800
                        });
                        setTimeout(()=>{
                           this.$router.push({
                           name:'teachersList',
                           })
                        },500)
                     }else{
                        this.$message.error('权限不够,请切换职工账号');
                     }
                  }
               },
               error=>{
                  console.log(error.message)
                  this.$message.error('登录失败');
               }
            )  
        }  
        
        //职工登录
        if(_this.radio=='2'){
            axios.post('/api/login',qs.stringify({usesId:_this.userId,userPwd:_this.userPwd})).then(
               response =>{
                  if(response.data.status==1){
                     this.$message.error(response.data.message);
                  }else{
                     //判断账号是否是管理员
                     sessionStorage.setItem('workname',response.data.workName)
                     sessionStorage.setItem('Permission',response.data.Permission)
                     if(response.data.Permission =='职工'&&_this.radio=='2'){
                           this.$message({
                           message:response.data.message,
                           type:'success',
                           duration:800
                        });
                        setTimeout(()=>{
                           this.$router.push({
                           name:'borrowList',
                           })
                        },500)
                     }else{
                        this.$message.error('请切换管理员账号');
                     }
                  }
               },
               error=>{
                  console.log(error.message)
                  this.$message.error('登录失败');
               }
            )  
        }

      }
   },
}
</script>

<style  scoped>
  .box-card {
    margin:250px auto;
    width: 480px;
    text-align: center;
    background-color:rgb(236, 245, 255);
  }
  .box-card h3{
     font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .el-input{
     width: 80%;
     margin-bottom: 40px;
  }
  .el-button{
     width: 80%;
     margin-bottom: 40px;
  }
  .check{
     width: 300px;
     height: auto;
     margin-top: -30px;
     margin-left: 40px;
     margin-bottom: 10px;
  }
  .check .el-radio{
     margin-right:0px;
  } 
  .check .el-radio:nth-child(1){
     margin-left: -160px;
  }
 
</style>
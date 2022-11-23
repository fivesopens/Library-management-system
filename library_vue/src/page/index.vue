<template>
  <el-container>
    <el-aside width="200px">
      <h1>后台管理</h1>
       <el-menu class="el-menu-vertical-demo">
         <el-menu-item index="1"  @click="goto_teachersList">
          <i class="el-icon-setting"></i>
          <span slot="title">职工信息管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="goto_stuList">
          <i class="el-icon-setting"></i>
          <span slot="title">读者信息管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="goto_suppList">
          <i class="el-icon-setting"></i>
          <span slot="title">供应商信息管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="goto_bookList">
          <i class="el-icon-setting"></i>
          <span slot="title">图书信息管理</span>
        </el-menu-item>
        <el-menu-item index="5" @click="goto_borrowList">
          <i class="el-icon-setting"></i>
          <span slot="title">借书还书管理</span>
        </el-menu-item>
        <el-menu-item index="6" @click="goto_penaltyList">
          <i class="el-icon-setting"></i>
          <span slot="title">罚款信息查询</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header><commHeader/></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import commHeader from '../components/commHeader.vue'
export default {
  name:'index',
  components:{commHeader},
   data() {
      return {
        
      };
    },
     methods: {
       goto_teachersList(){
         if(sessionStorage.getItem('Permission')=='管理员'){
             this.$router.push({
              name:'teachersList',
            })
         }else{
            this.$message.error('权限不够,不能访问请登录管理员账号');
         }
       },

        goto_stuList(){
          this.$router.push({
            name:'reaList',
        })
       },

       goto_borrowList(){
         this.$router.push({
           name:'borrowList'
         })
       },

       goto_suppList(){
          if(sessionStorage.getItem('Permission')=='管理员'){
             this.$router.push({
              name:'Supperlier',
            })
         }else{
            this.$message.error('权限不够,不能访问请登录管理员账号');
         }
       },
       
       goto_bookList(){
          this.$router.push({
           name:'Book'
         })
       },

       goto_penaltyList(){
         this.$router.push({
           name:'Penalty'
         })
       }
    }
}

</script>

<style scoped>
  .el-header, .el-footer {
    background-color: rgb(83, 168, 255);
    color: #333;
  }
  
  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    height: 100vh;
    font-size: 25px;
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
h1{
  margin-top:10px;
  margin-bottom: 10px;
  color: #333;
}
.el-main{
  line-height: 0;
  background-color: rgb(247 247 247);
}
</style>
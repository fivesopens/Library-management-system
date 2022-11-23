<template>
  <div class="header">
     <h3>欢迎! <span>{{name}}</span></h3>
     <div class="setting">
        <el-dropdown>
            <el-dropdown-menu></el-dropdown-menu> 
            <el-button type="primary" @click="exit">
                退出登录
            </el-button>
        </el-dropdown>
     </div>
  </div>
</template>

<script>
export default {
   name:'commHeader',
   data() {
       return {
         name:''
       }
   },
   methods: {
       exit(){
           console.log(1)
           this.$router.push({
               name:'Login'
           })
       }
   },

   mounted() {
        this.name=sessionStorage.getItem('workname')
   },

}
</script>

<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
  span{
      font-size: 17px;
  }
  .setting{
     width: 120px;
     height: 100%;
  }
  .el-button{
      background-color: rgb(121, 187, 255);
  }
</style>
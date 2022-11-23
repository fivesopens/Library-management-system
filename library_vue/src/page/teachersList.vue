<template>
  <div>
    <el-button class="add" @click="dialogVisibleInsert=true" type="primary" icon="el-icon-circle-plus-outline">添加教师信息</el-button>
    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="800"
      height="600">
      <el-table-column
        fixed
        prop="workerId"
        label="职工号"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="workerName"
        label="姓名"
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="workerAge"
        label="年龄"
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="adminSex"
        label="性别"
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="adminPhone"
        label="联系方式"
        width="150"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="Post"
        label="工作岗位"
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="Permissions"
        label="权限"
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="Sate"
        label="状态"
        width="120"
        align="center" > 
      </el-table-column>
      <el-table-column 
        label="操作"
        width="auto">
        <template slot-scope="scope">
          <el-button
          @click="shwoinsert"
            type="text"
            size="middle">
            岗位调动
          </el-button>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              离职/退休
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
               <el-button @click.native.prevent="UpdateState(scope.$index,tableData)" v-model="Sate" type="text" size="middle">退休</el-button>
            </el-dropdown-item>
              <el-dropdown-item>
                <el-button @click.native.prevent="UpdateState2(scope.$index,tableData)" v-model="Sate2" type="text" size="middle">离职</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="middle">
            移除
          </el-button>
          
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 弹出添加教师信息 -->
    <el-dialog title="添加信息" :visible.sync="dialogVisibleInsert" width="30%">
      <el-form :model="formInsert">
        <el-form-item label="职工号" :label-width="formLabelWidth">
          <el-input v-model.number="formInsert.workerId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formInsert.workerPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="formInsert.workerName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="formInsert.workerAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" class="item">
          <el-radio-group v-model="formInsert.adminSex" size="medium">
            <el-radio border label="男"></el-radio>
            <el-radio border label="女"></el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="formInsert.adminPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="formInsert.Post" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" class="item2">
          <el-radio-group v-model="formInsert.Permissions" size="medium">
            <el-radio border label="管理员"></el-radio>
            <el-radio border label="职工"></el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="formInsert.Sate" size="medium">
            <el-radio border label="在岗"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleInsert = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="insertInfo">确 定</el-button>
      </div>
    </el-dialog>
  
  <!-- 弹出框修改教师信息 -->
    <el-dialog
    title="信息修改"
    :visible.sync="dialogVisible"
    width="30%"
    top="10vh"
    :before-close="handleClose">
    <el-form :label-position="labelPosition" label-width="100px" :model="formUpdate">
    <el-form-item label="职工号:">
      <el-input v-model.number="formUpdate.workerId"></el-input>
    </el-form-item>
    <el-form-item label="联系方式:">
      <el-input v-model="formUpdate.adminPhone"></el-input>
    </el-form-item>
    <el-form-item label="工作岗位:">
      <el-input v-model="formUpdate.Post"></el-input>
    </el-form-item>
     <el-form-item label="权限:" >
      <el-radio-group v-model="formUpdate.Permissions" size="medium" class="itme3">
        <el-radio border label="管理员"></el-radio>
        <el-radio border label="职工"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="在岗状态:">
      <el-radio-group v-model="formUpdate.Sate" size="medium">
        <el-radio border label="在岗"></el-radio>
        <el-radio border label="离职"></el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateInfo">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name:'teachersList',
  data() {
    return {
      dialogVisible: false,
      dialogVisibleInsert:false,
      formLabelWidth: '120px',
      labelPosition: 'right',
      Sate:'退休',
      Sate2:'离职',
      tableData: [{
            workerId: '',
            workerName: '',
            workerAge:'',
            adminSex: '',
            adminPhone:'',
            Post: '',
            Permissions:'',
            Sate:''
      }],
      formUpdate: {
          workerId: '',
          adminPhone: '',
          Post: '',
          Permissions:'',
          Sate:'在岗',
      },
      formInsert: {
            workerId: '',
            workerPwd:'',
            workerName: '',
            workerAge:'',
            adminSex: '',
            adminPhone:'',
            Post: '',
            Permissions:'',
            Sate:'在岗'
      },
    }
  },
  methods: {
      shwoinsert(){
        this.dialogVisible = true
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      //更新状态为退休
      UpdateState(index,rows){
       axios.post(`/api/updateState`,qs.stringify({Sate:this.Sate,workerId:rows[index].workerId})).then(
         response=>{
            if(response.data.state=='1'){
                 this.$message({
                  message:response.data.message,
                  type:'success',
                  duration:1000
                });
             }else{
                this.$message.error(response.data.message);
             }
         },
         error=>{
            console.log('请求失败',error.message)
         }  
       )

        this.dialogVisibleInsert=false
         setTimeout(()=>{
          this.$router.go(0)
        },500)

      },

      //更新状态为离职
      UpdateState2(index,rows){
       axios.post(`/api/updateState`,qs.stringify({Sate:this.Sate2,workerId:rows[index].workerId})).then(
         response=>{
            if(response.data.state=='1'){
                 this.$message({
                  message:response.data.message,
                  type:'success',
                  duration:1000
                });
             }else{
                this.$message.error(response.data.message);
             }
         },
         error=>{
            console.log('请求失败',error.message)
         }
       )

        this.dialogVisibleInsert=false
         setTimeout(()=>{
          this.$router.go(0)
        },500)
        
      },

      
      
      //删除用户信息
      deleteRow(index, rows) {

        //如果用户已登录禁止删除
        if(rows[index].workerName==sessionStorage.getItem('workname')){
          this.$message.error('您账号已登录,禁止删除');
        }else{
          axios.post(`/api/delWorkInfo`,qs.stringify({workerId:rows[index].workerId})).then(
          response=>{
            if(response.data.state=='1'){
                this.$message({
                  message:response.data.message,
                  type:'success',
                  duration:1000
                });
            }else{
                this.$message.error(response.data.message);
            }
          },
          error=>{
            console.log('请求失败',error.message)
          }
        )
          rows.splice(index, 1);
        } 
      },
      //添加教师信息
      insertInfo(){
        axios.post(`/api/insertWorkInfo`,qs.stringify(this.formInsert)).then(
           response=>{
             if(response.data.state=='1'){
                this.$message({
                  message:response.data.message,
                  type:'success',
                  duration:1000
                });
             }else{
               this.$message.error(response.data.message);
             }
           },
           error=>{
              console.log('请求失败',error.message)
           }
        )

         this.dialogVisibleInsert=false
         setTimeout(()=>{
          this.$router.go(0)
        },500)
      },

      //修改信息
      updateInfo(){
         axios.post('/api/updateWorkInfo',qs.stringify(this.formUpdate)).then(
           response=>{
              if(response.data.state=='1'){
                 this.$message({
                  message:response.data.message,
                  type:'success',
                  duration:1000
                });
              }else{
                this.$message.error(response.data.message);
              }
           },
           error=>{
                console.log('请求失败',error.message)
           }
         )
         
          this.dialogVisible=false
          setTimeout(()=>{
            this.$router.go(0)
          },500)

      }
  },
  mounted() {
    axios.get('/api/showWorkInfo').then(
      response=>{
        this.tableData = response.data
      },
      error=>{
        console.log(error.message)
      }
    )
  },
}
</script>

<style scoped>
  .el-table-column{
   line-height: 0;
  }
  .el-table{
    line-height: 0;
  }
  .el-form-item{
    width: 380px;
  }
 .el-radio{
   margin-left: -190px;
 }
.add{
   float: left;
 }
 .item{
    margin-left: 80px;
    width: 413px;
 }
 .item2{
    margin-left: 85px;
    width: 443px;
 }
 .itme3{
    padding-left: 13px;
 }
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
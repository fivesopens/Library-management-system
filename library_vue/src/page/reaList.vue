<template>
  <div>
     <el-button class="add" @click="dialogVisible2=true" type="primary" icon="el-icon-circle-plus-outline">添加学生信息</el-button>
      <!-- 表格数据 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="800"
      height="600">
      <el-table-column
        fixed
        prop="userId"
        label="卡号"
        width="100"
        align="center">
      </el-table-column>
       <el-table-column
        fixed
        prop="userIdcard"
        label="身份证号"
        width="185"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="userName"
        label="姓名"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="userSex"
        label="性别"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="userPhone"
        label="联系方式"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="Penalty"
        label="罚款"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column 
        label="操作"
        width="auto"
       >
        <template slot-scope="scope">
          <el-button
          @click.native.prevent="editor(scope.$index, tableData)"
            type="text"
            size="middle">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="middle">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框修改读者信息 -->
    <el-dialog
    title="信息修改"
    :visible.sync="dialogVisible1"
    width="30%"
    top="10vh"
    :before-close="handleClose">
    <el-form :label-position="labelPosition" label-width="100px" :model="updateLabelAlign">
    <el-form-item label="联系方式:">
      <el-input v-model="updateLabelAlign.userPhone"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="updateReadInfo()">确 定</el-button>
    </span>
    </el-dialog>
    
    <!-- 添加读者信息 -->
    <el-dialog
    title="添加读者信息"
    :visible.sync="dialogVisible2"
    width="30%"
    top="10vh"
    :before-close="handleClose">
    <el-form :label-position="labelPosition" label-width="100px" :model="insert_tableData">
    <el-form-item label="卡号:">
      <el-input v-model.number="insert_tableData.userId" @blur="check"></el-input>
    </el-form-item>
    <el-form-item label="身份证号:">
      <el-input v-model.number="insert_tableData.userIdcard"></el-input>
    </el-form-item>
    <el-form-item label="姓名:">
      <el-input v-model="insert_tableData.userName"></el-input>
    </el-form-item>
    <el-form-item label="性别:" class="item" >
        <el-radio-group v-model="insert_tableData.userSex" class="item" size="medium">
          <el-radio border label="男"></el-radio>
          <el-radio border label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
    <el-form-item label="联系方式:">
      <el-input v-model="insert_tableData.userPhone"></el-input>
    </el-form-item>
    <el-form-item label="罚款:">
     <el-input v-model.number="insert_tableData.Penalty"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="addreaMsg">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
   name:'reaList',
   data() {
        return {
          dialogVisible1:false,
          dialogVisible2:false,
          labelPosition: 'right',
          penaltyState: '',
          penalty1:0,
          penalty2:'',
          //读者表数据
          tableData: [{
          userId:'',
          userName:'',
          userIdcard:'',
          userSex:'',
          userPhone:'',
          Penalty:''
          }],
         
         //添加表数据
          insert_tableData: {
            userId:'',
            userName:'',
            userIdcard:'',
            userSex:'',
            userPhone:'',
            Penalty:'0'
          },

         //修改表数据
          updateLabelAlign: {
            userPhone:'',
            userId:''
          }
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

      editor(index,rows){
         this.updateLabelAlign.userId=rows[index].userId
         this.dialogVisible1 = true
      },    


      //删除读者信息
      deleteRow(index, rows) {
        axios.post('/api/delReadInfo',qs.stringify({userId:rows[index].userId})).then(
          response=>{
            if(response.data.state=='1'){
              this.$message({
                message:response.data.message,
                type:'success',
                duration:1000
              })
              rows.splice(index, 1);
            }else{
              this.$message.error(response.data.message);
            }
          },
          error=>{
             console.log('请求失败',error.message)
          }
        )   
      }, 

      
      //修改读者信息
      updateReadInfo(){
           axios.post('/api/updateReadInfo',qs.stringify({userPhone:this.updateLabelAlign.userPhone,userId:this.updateLabelAlign.userId})).then(
             response =>{
                if(response.data.state=='1'){
                  this.$message({
                    message:response.data.message,
                    type:'success',
                    duration:1000
                  })
                  setTimeout(()=>{
                    this.$router.go(0)
                  },500) 
                }
             },
             error=>{
              console.log('请求失败',error.message)
             }
          )

      },

       //检查卡号是否存在
       check(){
         axios.post(`/api/checkId`,qs.stringify(this.insert_tableData)).then(
          response =>{
            if(response.data.state=='1'){
              this.$message.error(response.data.message);
            }
          },
          error=>{
            console.log('请求失败',error.message)
          },
        )
       },
       
       //添加读者信息
       addreaMsg(){
        
           axios.post('/api/insertReadInfo',qs.stringify(this.insert_tableData)).then(
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
                  this.$message.error(response.data.message);
                }
              },
              this.dialogVisible2=false,
              error=>{
                console.log('请求失败',error.message)
              }
            ) 
        
      }
    },


    mounted() {
      axios.get('/api/showReaderInfo').then(
        response=>{
          this.tableData = response.data
        },
        error=>{
          console.log('请求失败',error.message)
        }
      )
    },

}
</script>

<style scoped>
 .add{
   float: left;
 }
 .item{
   margin-right: 128px;
   width: 182px;
 }
 .item2{
   margin-top: 10px;
 }
</style>
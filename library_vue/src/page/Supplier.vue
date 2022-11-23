<template>
   <div>
      <el-button class="add" @click="dialogFormVisible1=true" type="primary" icon="el-icon-circle-plus-outline">添加供应商</el-button>
      <el-table
      :data="tableData"
      style="width: 100%"
      max-height="800"
      height="600">
        <el-table-column
            prop="suppliersId"
            label="供应商号"
            width="150"
            align="center">
        </el-table-column>
        <el-table-column
            prop="suppliersName"
            label="出版社"
            width="150"
            align="center" >
        </el-table-column>
        <el-table-column
            prop="suppliersPhone"
            label="联系方式"
            width="150"
            align="center" >
        </el-table-column>
        <el-table-column
            prop="suppliersAddress"
            label="地址"
            width="250"
            align="center" >
        </el-table-column>
        <el-table-column
        label="操作"
        width="auto">
            <template slot-scope="scope">
               <el-button type="text" size="small" @click.native.prevent="showEidx(scope.$index,tableData)">编辑</el-button>
                <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                移除
               </el-button>
            </template>
        </el-table-column>
      </el-table>

      <!-- 新增供应商信息框 -->
      <el-dialog title="新增供应商" :visible.sync="dialogFormVisible1" width="30%"  :before-close="handleClose">
        <el-form :model="insertData">
            <el-form-item label="供应商号:" :label-width="formLabelWidth">
                <el-input v-model="insertData.suppliersId" autocomplete="off" @blur="checkId"></el-input>
            </el-form-item>
            <el-form-item label="出版社:" :label-width="formLabelWidth">
                <el-input v-model="insertData.suppliersName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:" :label-width="formLabelWidth">
                <el-input v-model="insertData.suppliersPhone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址:" :label-width="formLabelWidth">
                <el-input v-model="insertData.suppliersAddress" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="insertInfo">确 定</el-button>
        </div>
      </el-dialog>

       <!--修改信息框  -->
      <el-dialog title="修改信息" :visible.sync="dialogFormVisible" width="30%"  :before-close="handleClose">
        <el-form :model="updatefrom">
            <el-form-item label="新地址:" :label-width="formLabelWidth">
                <el-input v-model="updatefrom.suppliersAddress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新联系方式:" :label-width="formLabelWidth">
                <el-input v-model="updatefrom.suppliersPhone" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateInfo">确 定</el-button>
        </div>
      </el-dialog>
      
   </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs'
export default {
  name:'Supplier',
  
  data() {
      return {
           dialogFormVisible:false,
           dialogFormVisible1:false,
           formLabelWidth: '100px',

           tableData: [{
            suppliersId: '',
            suppliersName: '',
            suppliersPhone:'',
            suppliersAddress: ''
          }],

          
          insertData:{
            suppliersId: '',
            suppliersName: '',
            suppliersPhone:'',
            suppliersAddress: ''
          },

          updatefrom: {
           suppliersId:'',
           suppliersPhone:'',
           suppliersAddress:''
        },
       
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


    showEidx(index, rows){
      this.updatefrom.suppliersId=rows[index].suppliersId
      this.dialogFormVisible=true
    },

    //删除供应商
    deleteRow(index, rows) {
       axios.post(`/api/delSupplierInfo`,qs.stringify({suppliersId:rows[index].suppliersId})).then(
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
           console.log('请求收失败',error.message)
         }
       )
      
    },

    //新增供应商
    insertInfo(){
      axios.post('/api/insertSupplierInfo',qs.stringify(this.insertData)).then(
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

             this.dialogFormVisible1=false

            }else{
              this.$message.error(response.data.message);
            }
        },
        error=>{
          console.log('请求失败',error.message)
        }
      )
    },

    //更新供应商信息
    updateInfo(){
      console.log(this.updatefrom)
       axios.post('/api/updateSupplierInfo',qs.stringify(this.updatefrom)).then(
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
         error=>{
           console.log('请求失败',error.message)
         }
       )
    },

    //检查供应商id是否存在
    checkId(){
      axios.post('/api/check',qs.stringify({suppliersId:this.insertData.suppliersId})).then(
        response=>{
            if(response.data.state=='1'){
              this.$message.error(response.data.message);
            }
        },
        error=>{
          console.log('请求失败',error.message)
        }
      )
    }
  },
  mounted() {
     axios.get('/api/showSupplierInfo').then(
         response =>{
          this.tableData = response.data
         },
         error=>{
           console.log('请求失败',error.message)
         }
     )
  },
}
</script>

<style>
 .add{
   float: left;
 }
</style>
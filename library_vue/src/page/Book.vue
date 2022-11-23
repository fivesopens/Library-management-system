<template>
    <div>
      <el-button class="add" @click="dialogFormVisible=true" type="primary" icon="el-icon-circle-plus-outline">添加新书本</el-button>
      <el-table
      :data="tableData"
      style="width: 100%"
      max-height="800"
      row-key="booksId"
      height="600">
        <el-table-column
            prop="booksId"
            label="书本编号"
            width="150"
            align="center">
        </el-table-column>
        <el-table-column
            prop="booksName"
            label="图书名"
            width="150"
            align="center" >
        </el-table-column>
        <el-table-column
            prop="booksAuthor"
            label="作者"
            width="150"
            align="center" >
        </el-table-column>
         <el-table-column
            prop="supplierName"
            label="出版社"
            width="120"
            align="center" >
        </el-table-column>
        <el-table-column
            prop="booksState"
            label="状态"
            width="120"
            align="center" >
        </el-table-column>
        <el-table-column
        label="操作"
        width="auto">
            <template slot-scope="scope">
              <el-dropdown  trigger="click" >
                <span class="el-dropdown-link">
                  修改状态<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                     <el-button
                        @click.native.prevent="updateState1(scope.$index, tableData)"
                        type="text"
                        size="small"
                        v-model="bookState1"
                        >
                        未借出
                     </el-button>   
                  </el-dropdown-item>
                  <el-dropdown-item>
                      <el-button
                        @click.native.prevent="updateState2(scope.$index, tableData)"
                        type="text"
                        size="small"
                        v-model="bookState2">
                        已借出
                     </el-button>   
                  </el-dropdown-item>
                  <el-dropdown-item>
                     <el-button
                        @click.native.prevent="updateState3(scope.$index, tableData)"
                        type="text"
                        size="small"
                        v-model="bookState3">
                        已报废
                     </el-button>   
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
               
            </template>
        </el-table-column>
      </el-table>

       <!--添加信息框  -->
      <el-dialog title="添加新书" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="insertfrom">
            <el-form-item label="书本编号:" :label-width="formLabelWidth">
                <el-input v-model="insertfrom.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图书名:" :label-width="formLabelWidth">
                <el-input v-model="insertfrom.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者:" :label-width="formLabelWidth">
                <el-input v-model="insertfrom.author" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版社:" :label-width="formLabelWidth">
                <el-input v-model="insertfrom.press" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="insert">确 定</el-button>
        </div>
      </el-dialog>
      
   </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
  name:'Book',
   data() {
      return {
           dialogFormVisible:false,
           formLabelWidth: '100px',
           tableData: [],
           commandIndex:'',
           bookState1:'未借出',
           bookState2:'已借出',
           bookState3:'已报废',
           insertfrom:{
                id:'',
                name:'',
                author:'',
                press:'',
           }
      }
  },
  methods: {
    //跟新状态为未借出
    updateState1(index, rows) {
        axios.post('/api/updateBookState',qs.stringify({booksState:this.bookState1,booksId:rows[index].booksId})).then(
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
    
    //跟新状态为已借出
    updateState2(index, rows) {
        axios.post('/api/updateBookState',qs.stringify({booksState:this.bookState2,booksId:rows[index].booksId})).then(
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

    //跟新状态为已报废
    updateState3(index, rows) {
        axios.post('/api/updateBookState',qs.stringify({booksState:this.bookState3,booksId:rows[index].booksId})).then(
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
    


    insert(){
       axios.post(`/api/insertBookInfo`,qs.stringify(this.insertfrom)).then(
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
    }
  },

  mounted() {
     
     axios.get('/api/showBookInfo').then(
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
   .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
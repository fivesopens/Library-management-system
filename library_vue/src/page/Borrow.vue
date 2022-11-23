<template>
  <div>
    <el-switch
      style="display: block"
      v-model="switch1"
      active-color="#13ce66"
      inactive-color="#409EFF"
      active-text="还书"
      inactive-text="借书">
    </el-switch>
    
    <el-card v-show="switch1==false" class="box-card">
        <div slot="header" class="clearfix">
          <h1>借书管理</h1>
        </div>
      <el-input class="idInput" v-model.number="readId" placeholder="请输入或扫描读者卡号" @blur="showInfo"></el-input>

      <!-- 读者信息列表 -->
        <div v-show="showredInfo" class="readList">
          <div v-for="item in redInfo" :key="item.userId" class="text item">
            <p>{{'读者卡号:'+ item.userId}}</p>
            <p>{{'读者姓名:'+ item.userName}}</p>
            <p>{{'性别:'+ item.userSex}}</p>
            <p>{{'罚款:'+ item.Penalty}}</p>
          </div>
        </div> 
        
        <el-input class="bookInput" v-model="bookId" placeholder="请输入或扫描书本编号"></el-input>

        <!-- 日期选择 -->
        <div class="block">
          <span class="demonstration">请选择借阅日期:</span>
          <el-date-picker
            v-model="selDate"
            type="datetimerange"
            align="center"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </div>

        <el-button class="button" type="primary" :disabled="disabled" @click="borrow">借书</el-button>
    </el-card>

     <el-card v-show="switch1==true" class="box-card">
        <div slot="header" class="clearfix">
          <h1>还书管理</h1>
        </div>
        <el-input class="idInput" v-model="reBookId" placeholder="请输入或扫描书本编号" @blur="showReInfo"></el-input>

         <div class="block">
          <span class="demonstration">请选实际择还书日期:</span>
          <el-date-picker
            v-model="selretDate"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </div>

        <div v-show="showreturnInfo" class="readList">
          <div v-for="item in returnInfo" :key="item.booksId" class="text item">
            <p>{{ '读者卡号:' + item.userId}}</p>
            <p>{{ '读者姓名:' + item.userName}}</p>
            <p>{{ '图书编号:' + item.booksId}}</p>
            <p>{{ '图书名:' + item.booksName}}</p>
            <p>{{'借阅时间:' +fomartDate(item.borrowingTime)}}</p>
            <p>{{'预计归还时间:'+fomartDate(item.returnTime)}}</p>
            {{'实际归还时间：'+selretDate}}
          </div>
        </div> 
        <el-button class="button" type="primary" @click="returnBook">还书</el-button>
    </el-card>

  </div>
</template>

<script>
import axios from 'axios'
import qs, { stringify } from 'qs'
export default {
  name:'Borrow',
  data() {
    return {
       readId:'',
       bookId:'',
       reBookId:'',
       selDate: '',
       selretDate:'',
       showredInfo:false,
       showreturnInfo:false,
       disabled:true,
       switch1:false,
       redInfo:{
         userId: '', 
         userName:'',
         Penalty: '',
         userSex: ''
       },
       returnInfo:{
          booksId: '',
          booksName:'',
          borrowingTime: '',
          returnTime: '',
          userId: '',
          userName: ''
       }
    }
  },
  methods: {
      
      //展示读者信息进行资格审查
      showInfo(){

        //罚款不为输入不为空按钮启用 
        if(this.redInfo.Penalty==0&&this.redInfo.Penalty!==null){
            this.disabled = false
         }
         
         axios.post('/api/returnInfo',qs.stringify({userId:this.readId})).then(
           response=>{
              if(response.data.state=='1'){
                   this.redInfo = response.data.results
                   this.showredInfo = true
              }else{
                  this.$message.error(response.data.message);
                   this.showredInfo = false
                   this.disabled = true
              }
           },
           error=>{
             console.log('请求失败',error.message);
           }
         )
        
         
      },
      
      //借阅管理
      borrow(){
        
        //罚款未缴纳不符合条件的读者不办理借书手续
        if(this.redInfo[0].Penalty>0){
            this.$message.error('罚款未缴纳，不能借阅');
        }else{
              
          //查询是否有借书信息存在
          axios.post('/api/isBorrow',qs.stringify({booksId:this.bookId})).then(
            response=>{

              //借书信息存在则修改之前的借书信息
              if(response.data.state=='1'){
              
                axios.post('/api/updateBorrow',qs.stringify({userId:this.readId,booksId:this.bookId,borrowingTime:this.selDate[0],returnTime:this.selDate[1]})).then(
                  response=>{
                      console.log(response.data.state)
                      
                      if(response.data.state=='1'){
                            this.$message({
                              message:response.data.message,
                              type:'success',
                              duration:1000
                            })

                              //书本借出更新状态为已借出
                              axios.post('/api/updateLent',qs.stringify({booksState:'已借出',booksId:this.bookId})).then(
                                  response=>{ 
                                  if(response.data.state=='1'){
                                      this.$message({
                                          message:response.data.message,
                                          type:'success',
                                          duration:1000
                                        })
                                      
                                    }else{
                                      this.$message.error(response.data.message);
                                  }
                              }
                            )

                          }else{
                            this.$message.error(response.data.message);
                          }

                  },
                  error=>{
                    console.log('请求失败',error.message)
                  }
                )
    
              }else{
                      
                //借书信息不存在则新增借书信息  
                axios.post('/api/insertBorrow',qs.stringify({userId:this.readId,booksId:this.bookId,borrowingTime:this.selDate[0],returnTime:this.selDate[1]})).then(
                      response=>{
                          if(response.data.state=='1'){
                              this.$message({
                                message:response.data.message,
                                type:'success',
                                duration:1000
                              })

                              //书本借出更新状态为已借出
                              axios.post('/api/updateLent',qs.stringify({booksState:'已借出',booksId:this.bookId})).then(
                                  response=>{ 
                                  if(response.data.state=='1'){
                                      this.$message({
                                          message:response.data.message,
                                          type:'success',
                                          duration:1000
                                        })
                                      
                                    }else{
                                      this.$message.error(response.data.message);
                                  }
                              }
                            )

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
            error=>{
              console.log('请求失败',error.message)
            }
          )

        }
        
      },

      //查询归还信息
      showReInfo(){
        axios.post('/api/showBorrow',qs.stringify({booksId:this.reBookId})).then(
          response=>{
            if(response.data.state=='1'){
              this.returnInfo = response.data.results
              this.showreturnInfo =true
            }else{
               this.$message.error(response.data.message);
            }
          },
          error=>{
            console.log('请求失败',error.message)
          }
        )
      },
      
      //还书管理
      returnBook(){
        //实际归还时间和预计归还时间相差天数
        let diffDays = this.dayjs(this.selretDate).diff(this.dayjs(this.returnInfo[0].returnTime), 'days')
      
         if(diffDays>0){

            //相差天数大于0
            axios.post('/api/updatePenalty',qs.stringify({Penalty:diffDays*5,userId:this.returnInfo[0].userId})).then(
              response=>{
                  if(response.data.state=='1'){
                     this.$message({
                      message:response.data.message,
                      type:'success',
                      duration:1000
                    })

                  //更新书本状态为未借出
                  axios.post('/api/updateBookState',qs.stringify({booksState:'未借出',booksId:this.reBookId})).then(
                      response=>{ 
                    },
                    error=>{
                      console.log('请求失败',error.message)
                    }
                  )
                  
                       
                  //更新归还时间
                  axios.post('/api/updateReturnBook',qs.stringify({returnTime:this.selretDate,booksId:this.reBookId})).then(
                    response=>{
                       
                    },
                    error=>{
                      console.log('请求失败',error.message)
                    }
                  )

                  }else{
                     this.$message.error(response.data.message);
                  }
              },
              error=>{
                 console.log('请求失败',error.message)
              }
            )
         }else{

           //像差天数小于0不增加罚款
            axios.post('/api/updateBookState',qs.stringify({booksState:'未借出',booksId:this.reBookId})).then(
                response=>{ 
                if(response.data.state=='1'){
                    this.$message({
                        message:'图书已归还',
                        type:'success',
                        duration:1000
                      })
                    
                   //更新归还时间
                    axios.post('/api/updateReturnBook',qs.stringify({returnTime:this.selretDate,booksId:this.reBookId})).then(
                      response=>{
                        
                      },
                      error=>{
                        console.log('请求失败',error.message)
                      }
                    )
                  
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

      // 格式化日期
      fomartDate(time) {
        // 将需要格式化的数据传入
        time = this.dayjs(time).format('YYYY-MM-DD HH:mm:ss') //这个时间已经加了8小时哦,跟你
                                                              //如果是添加事件,时间就是当下时间                                                          
        return time
      }
  },
}


</script>

<style scoped>
 .text {
    font-size: 16px;
    padding: 0px 0;
  }

  .item {
    margin-bottom: -14px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 700px;
    height: 470px;
    margin: 0 auto;

  }
  .idInput{
    margin-bottom: 13px;
  }
  .readList{
    margin-left: 3px;
    margin-top: 10px;
    padding-bottom: 16px;
    text-align: left;
  }
  .button{
    width: 100%;
    margin-top: 25px;
  }
  .block{
    margin-top: 10px;
  }
  .demonstration{
     margin-left: -135px;
     padding-right: 10px;
  }
  .el-switch{
    float: left;
    position: absolute;
    left: 530px;
    top: 108px;
  }
  .readList p{
    padding-bottom: 14px;
  }
</style>
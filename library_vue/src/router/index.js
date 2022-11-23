//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
import Vue from 'vue'
Vue.use(VueRouter)
//引入组件
import Login from '../page/Login.vue'
import Index from '../page/index.vue'
import reaList from '../page/reaList.vue'
import teachersList from '../page/teachersList.vue'
import borrow from '../page/Borrow.vue'
import Supperlier from '../page/Supplier.vue'
import Book from '../page/Book.vue'
import Penalty from '../page/Penalty.vue'
const routes = [
    {
        path:'/',
        name:'Login',
        component:Login,
    },
    { 
            path:'/index',
            name:'index',
            component:Index,
            children:[

                //教师列表路由
                {
                    path:'teachersList',
                    name:'teachersList',
                    component: teachersList
                },

                //学生列表路由
                {
                    path:'reaList',
                    name:'reaList',
                    component: reaList
                },

                //供应商列表路由
                {
                    path:'Supperlier',
                    name:'Supperlier',
                    component:Supperlier
                },

                //图书信息路由
                { 
                   path:'Book',
                   name:'Book',
                   component:Book  
                },

                //借阅管理路由
                {
                    path:'borrowList',
                    name:'borrowList',
                    component:borrow
                },
                 
                //罚款信息查询路由
                {
                    path:'Penalty',
                    name:'Penalty',
                    component:Penalty
                }
                
            ]
    }
    
]

const router = new VueRouter({
    routes,
    
})

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
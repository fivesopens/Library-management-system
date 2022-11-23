const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  //开启代理服务器
  devServer:{
    proxy:{

      '/api':{
        target:'http://localhost/api',
        pathRewrite:{ '^/api': '/' },
        ws:true,//用于支持websocket,
        changeOrigin:true//用于控制请求头中的host值
      }

      // //登录服务器
      // '/login':{
      //   target:'http://localhost',
      //   pathRewrite:{'^/login':''},
      //   ws:true,//用于支持websocket,
      //   changeOrigin:true//用于控制请求头中的host值
      // },
      // //展示职工信息服务器
      // '/showWorkInfo':{
      //   target:'http://localhost',
      //   pathRewrite:{'^/showWorkInfo':''},
      //   ws:true,//用于支持websocket,
      //   changeOrigin:true//用于控制请求头中的host值
      // },
      // //添加职工信息服务器
      // '/insertWorkInfo':{
      //   target:'http://localhost',
      //   pathRewrite:{'^/insertWorkInfo':''},
      //   ws:true,//用于支持websocket,
      //   changeOrigin:true//用于控制请求头中的host值
      // },
      // //跟新职工信息服务器
      // '/updateWorkInfo':{
      //   target:'http://localhost',
      //   pathRewrite:{'^/updateWorkInfo':''},
      //   ws:true,//用于支持websocket,
      //   changeOrigin:true//用于控制请求头中的host值
      // },
      // //删除职工信息服务器
      // '/delWorkInfo':{
      //   target:'http://localhost',
      //   pathRewrite:{'^/delWorkInfo':''},
      //   ws:true,//用于支持websocket,
      //   changeOrigin:true//用于控制请求头中的host值
      // },
      // //修改在职状态服务器
      // '/updateState':{
      //   target:'http://localhost',
      //   pathRewrite:{'^/updateState':''},
      //   ws:true,//用于支持websocket,
      //   changeOrigin:true//用于控制请求头中的host值
      // },
      

      // //展示读者信息 
      // '/showReaderInfo':{
      //   target:'http://localhost',
      //   pathRewrite:{'^/showReaderInfo':''},
      //   ws:true,//用于支持websocket,
      //   changeOrigin:true//用于控制请求头中的host值
      // },
      // //添加读者信息
      // '/insertReadInfo':{
      //   target:'http://localhost',
      //   pathRewrite:{'^/insertReadInfo':''},
      //   ws:true,//用于支持websocket,
      //   changeOrigin:true//用于控制请求头中的host值
      // },
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store(
  {
    state: {
      isLogin: false,
      userinfo: [],
     // usesrname: '',

 
      token:"",
      userID:"",
      // // 用户头像
      // profilePicture: "",
      // username: "",
      // // 在线人数
      // onlineUsers:"",
      // socket: {
      //   // 连接状态
      //   isConnected: false,
      //   // 消息内容
      //   message: '',
      //   // 重新连接错误
      //   reconnectError: false,
      //   // 心跳消息发送时间
      //   heartBeatInterval: 50000,
      //   // 心跳定时器
      //   heartBeatTimer: 0
      // }
    },
    mutations: {
      // // 连接打开
      // SOCKET_ONOPEN (state, event)  {
      //   Vue.prototype.$socket = event.currentTarget;
      //   state.socket.isConnected = true;
      //   // 连接成功时启动定时发送心跳消息，避免被服务器断开连接
      //   state.socket.heartBeatTimer = setInterval(() => {
      //     const message = "心跳消息";
      //     state.socket.isConnected && Vue.prototype.$socket.sendObj({"code":200,"msg":message});
      //   }, state.socket.heartBeatInterval);
      // },
      // // 连接关闭
      // SOCKET_ONCLOSE (state, event)  {
      //   state.socket.isConnected = false;
      //   // 连接关闭时停掉心跳消息
      //   clearInterval(state.socket.heartBeatTimer);
      //   state.socket.heartBeatTimer = 0;
      //   console.log('连接已断开: ' + new Date());
      //   console.log(event);
      // },
      // // 发生错误
      // SOCKET_ONERROR (state, event)  {
      //   console.error(state, event)
      // },
      // // 收到服务端发送的消息
      // SOCKET_ONMESSAGE (state, message)  {
      //   state.socket.message = message
      // },
      // // 自动重连
      // SOCKET_RECONNECT(state, count) {
      //   console.info('消息系统重连中...', state, count);
      // },
      // // 重连错误
      // SOCKET_RECONNECT_ERROR(state) {
      //   state.socket.reconnectError = true;
      // },
    },
    actions: {
      customerAdded (context) {
        console.log('action received: customerAdded');
        console.log(context)
      }
    },
    getters: {
      isLogin(state) {
        var userinfo =  localStorage.getItem('userinfo')
   

        if (userinfo == '' || userinfo == 'undefined' || userinfo == undefined) {
          state.isLogin = false
        }else {
          state.isLogin = true
                  //获取用户状态
         userinfo = JSON.parse(localStorage.getItem('userinfo'));
         state.userinfo = userinfo
        }
        console.log(userinfo)
        return state.isLogin
      }
    },
    actions: {
      customerAdded (context) {
        // 新连接添加函数
        console.log('action received: customerAdded');
        console.log(context)
      }
    },
  }
)

export default store

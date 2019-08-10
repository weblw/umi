import axios from 'axios'
import router from 'umi/router'

// 初始状态：本地缓存或空值对象
const userinfo=JSON.parse(localStorage.getItem('userinfo'))||{
  token:'',
  role:'',
  username:'',
  balance:0
}
// 登录请求方法
function login(payload){
  return axios.post('/api/login',payload)
}

export default{
  namespace:'user',
  state:userinfo,
  effects:{
    // action:user/login
    *login({payload},{call,put}){
      try{
        const {data:{code,data:userinfo}}=yield call(login,payload)
        if(code==0){
          // 登陆成功：缓存用户信息
          localStorage.setItem('userinfo',JSON.stringify(userinfo))
          yield put({type:'init',payload:userinfo})
          router.push('/')
        }
      }catch(error){
        // 登陆失败：错误信息已在拦截器实现，可执行其他业务
      }
    }
  },
  reducers:{
    init(state,action){
      // 覆盖旧状态
      return action.payload
    }
  }
}
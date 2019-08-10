import axios from 'axios'
function getGoods(){
  return axios.get('/api/goods')
}
function getgood(payload){
  return axios.post('/api/getGood',payload)
}
export default {
  namespace:'goods',
  state:{//初始状态包括课程和分类
    courses:{},//课程
    tags:[],//分类
    good:{}
  },
  effects:{
    *getList(action,{call,put}){
      // 解构出courseData并初始化状态
      const {data:{data:courseData}}=yield call(getGoods)
      yield put({type:'initGoods',payload:courseData})
    },
    *getGood({payload},{call,put}){
      const {data:{data:good}}=yield call(getgood,payload)
      yield put({type:'good',payload:good})
    }
  },
  reducers:{
    initGoods(state,{payload}){
      // 解构出tags和courses并返回
      const {tags,data:courses}=payload
      return {...state,tags,courses}
    },
    good(state,{payload}){
      const good=payload
      return {...state,good}
    }
    // addGood(state,action){
    //   return [...state,{title:action.payload}]
    // }
  }
}
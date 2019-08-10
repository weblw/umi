import React,{Component} from 'react'
import styles from './login.css';
import router from 'umi/router' 
import {Login} from 'ant-design-pro'
import {connect} from 'dva'

const {UserName,Password,Submit} =Login

export default connect()(function(props) {
  // let from=props.location.state.from||'/'
  const onSubmit=(err,values)=>{
    console.log('用户输入：',values)
    if(!err){
      // 校验通过
      props.dispatch({type:'user/login',payload:values})
    }
  }
  return (
    <div className={styles.loginForm}>
      {/* login */}
      <img className={styles.logo} 
      src="https://img.kaikeba.com/logo-new.png"/>
      {/* 登陆表单 */}
      <Login onSubmit={onSubmit}>
        <UserName 
          name='username'
          placeholder='kaikeba'
          rules={[{required:true,message:'请输入用户名'}]}
        />
        <Password 
          name='password'
          placeholder='123'
          rules={[{required:true,message:'请输入密码'}]}
        />
        <Submit>登录</Submit>
      </Login>      
    </div>
  );
})

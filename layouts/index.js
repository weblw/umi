import React,{Component} from 'react'
import {Layout,Menu,Badge,Icon,Dropdown} from 'antd'
import styles from './index.css';
import Link from 'umi/link'
import {connect} from 'dva'

const {Header,Footer,Content}=Layout

@connect(state=>({
  count:state.cart.length,
  cart:state.cart
}))
export default class extends Component{
  onItemClick=item=>{
    console.log(item)
  }
  render(){
  const selectedkeys=[this.props.location.pathname]
  if(this.props.location.pathname==='/login'||this.props.location.pathname==='/404'){
    return <>{this.props.children}</>
  }
  const menu=(
    <Menu>
      {this.props.cart.map((item,index)=>(
        <Menu.Item key={index}>
          {item.name}×{item.count} <span>￥{item.count*item.price}</span>
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <Layout>
      {/* 页头 */}
      <Header className={styles.header}>
        <img className={styles.logo} src="https://img.kaikeba.com/logo-new.png"/>
        <Menu
          theme='dark'
          mode='horizontal'
          selectedKeys={selectedkeys}
          style={{lineHeight:'64px',float:'left'}}
        >
          <Menu.Item key='/goods'>
            <Link to='/goods'>商品</Link>
          </Menu.Item>
          <Menu.Item key='/user'>
            <Link to='/user'>用户</Link>
          </Menu.Item>
          <Menu.Item key='/about'>
            <Link to='/about'>关于</Link>
          </Menu.Item>
        </Menu>
        {/* 购物车 */}
        <Dropdown overlay={menu} placement='bottomRight'>
          <div className={styles.cart}>
            <Icon type='shopping-cart' style={{fontSize:18}} />
            <span>我的购物车</span>
            <Badge count={this.props.count} offset={[-4,-18]} />
          </div>
        </Dropdown>
      </Header>
      {/* 内容 */}
      <Content className={styles.content}>
        <div className={styles.box}>{this.props.children}</div>
      </Content>
      {/* 页脚 */}
      <Footer className={styles.footer}>开课吧</Footer>
    </Layout>
  )
  }
}

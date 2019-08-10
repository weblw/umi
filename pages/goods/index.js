import router from 'umi/router'
import styles from './index.css';
import { connect } from 'dva';
import React,{useEffect, Component} from 'react'
import {TagSelect} from 'ant-design-pro'
import {Card,Row,Col,Skeleton,Icon} from 'antd'

@connect(
  state=>({
    loading:state.loading,
    courses:state.goods.courses,// 映射课程数据
    tags:state.goods.tags,// 映射标签数据
  }),
  {
    getList:()=>({
      type:'goods/getList'
    }),
    addCart:item=>({//加购物车
      type:'cart/addCart',
      payload:item
    })
  }
)
class Goods extends Component{
  constructor(props){
    super(props)
    // displayCourses为需要显示的商品
    this.state={
      displayCourses:new Array(8).fill({}),//填充数组用于骨架屏展示
      tags:[]
    }
  }
  componentDidMount() {
    this.props.getList();
  }
  // 数据传入时执行tagSelectChange
  componentWillReceiveProps(props){
    if(props.tags.length){
      this.tagSelectChange(props.tags,props.courses)
    }
  }
  // 额外传入课程列表数据
  tagSelectChange=(tags,courses=this.props.courses)=>{
    // 过滤要显示的数据
    let displayCourses=[]
    tags.forEach(tag=>{
      displayCourses=[...displayCourses,...courses[tag]]
    })
    // 用户行为修改为状态
    this.setState({displayCourses,tags})
  }
  addCart=(e,item)=>{
    e.stopPropagation()
    this.props.addCart(item)
  }
  render(){
    // 使用骨架屏做加载反馈，loading属性不再需要
    // if(this.props.loading.models.goods){
    //   return <div>加载中...</div>
    // }
    return(
      <div>
        {/* 分类标签 */}
        {/* 组件受控 */}
        <TagSelect value={this.state.tags} onChange={this.tagSelectChange}>
          {this.props.tags.map(tag=>{
            return(
              <TagSelect.Option key={tag} value={tag}>
                {tag}
              </TagSelect.Option>
            )
          })}
        </TagSelect>
        {/* 商品列表 */}
        <Row type='flex' justify='start'>
          {this.state.displayCourses.map((item,index)=>{
            return(
              <Col key={index} style={{padding:10}} span={4} onClick={()=>router.push(`/goods/${item.id}`)}>
                {item.name?(
                  <Card 
                    extra={
                      <Icon onClick={e=>this.addCart(e,item)}
                        type='shopping-cart'
                        style={{fontSize:18}}
                      />
                    }
                    hoverable
                    title={item.name}
                    cover={<img src={'/course/'+item.img} />}
                  >
                    <Card.Meta 
                      description={
                        <div>
                          <span>￥{item.price}</span>
                          <span style={{float:'right'}}>
                            <Icon type='user' />{item.solded}
                          </span>
                        </div>
                      }
                    />
                    <div />
                  </Card>
                ):(
                  <Skeleton active={true} />
                )}
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
}
export default Goods

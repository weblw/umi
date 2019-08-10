import {connect} from 'dva'
import React,{Component} from 'react'
import styles from './$id.css';

export default connect(
  state=>({
    good:state.goods.good
  }),
  {
    getGood:(payload)=>({
      type:'goods/getGood',
      payload
    })
  }
)(class extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount() {
    this.props.getGood({id:this.props.match.params.id})
  }
  render(){
    return (
      <div className={styles.normal}>
        <h1>Page id:{this.props.match.params.id}</h1>
        <img src={'/course/'+this.props.good.img} />
        <h1>{this.props.good.name}</h1>
      </div>
    );
  }  
})

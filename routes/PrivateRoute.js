import Redirect from 'umi/redirect'

export default props=>{
  if(!localStorage.getItem('userinfo')){
    return <Redirect to='/login' />
  }
  return (
    <div>
      <div>Redirect</div>
      {props.children}
    </div>
  )
}
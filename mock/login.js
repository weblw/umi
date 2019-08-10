export default{
  'post /api/login'(req,res){
    const {username,password}=req.body
    if(username=='kaikeba'&&password=='123'){
      return res.json({
        code:0,
        data:{
          token:'kaikebaisgood',
          role:'admin',
          balance:1000,
          username:'kaikeba'
        }
      })
    }
    if(username=='jerry'&&password=='123'){
      return res.json({
        code:0,
        data:{
          token:'kaikebaisgood',
          role:'user',
          balance:100,
          username:'jerry'
        }
      })
    }
    return res.status(401).json({
      code:-1,
      msg:'用户名或密码错误'
    })
  }
}
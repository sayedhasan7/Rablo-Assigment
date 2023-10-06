const jwt  = require("jsonwebtoken")


const Authenticate = async(req,res,next) =>{
  try{
    const {token} = req.body
      if(!token){
        return res.status(401).json({ message: "Access denied. You Need To Login First" });
      }
       const user = jwt.verify(token,"process.env.SECRETKEY")
       if(!user){
        return res.status(401).json({ message: "Access denied. You Need To Login First" });
      }
       req.user = user
        next();

  }catch(error){
     console.error(error)
  }
}

module.exports = Authenticate;
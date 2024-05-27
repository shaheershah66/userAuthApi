import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  if(!req.headers["authorization"]){
    return res.status(403).json({ message: "Token is required" });
  }
  try{
    const token = req.headers["authorization"].split("Bearer ");
    const decoded = jwt.verify(token[1], process.env.SECRET_KEY);
    return next();
  } 
  catch(error){
    return res.status(403).json({ message: "Token is not valid, or it's expired" });
  }
};

export default auth



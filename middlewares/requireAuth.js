import Jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw {name:"Jwt",message:"no envio token"}
    token = token.split(" ")[1];
    const {uid} = Jwt.verify(token, process.env.Jwt_Secret);
    req.uid= uid
    next()
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error });
  }
};

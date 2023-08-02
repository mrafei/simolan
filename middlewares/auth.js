import jwt from "jsonwebtoken";
import jwtSecret from "../configs/jwt";

export default (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const err = new Error("Unauthorized!");
    err.statusCode = 403;
    throw err;
  }
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, jwtSecret);
  if (!decodedToken) {
    const err = new Error("Invalid Token");
    err.statusCode = 401;
    throw err;
  }
  req.user = decodedToken.id;
  next();
};

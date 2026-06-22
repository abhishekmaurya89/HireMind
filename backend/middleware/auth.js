import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Login Required",
    });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Could not verify user",
    });
  }
};

export default authMiddleware;
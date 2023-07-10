const jwt = require("jsonwebtoken");
const JWT_SECRET = "myJwtSecret";

const fetchuser = (req, res, next) => {
  //get user from jwt token and id to req object

  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({
      sucess: false,
      message: "unauthorized access",
    });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({
      sucess: false,
      message: "unauthorized access",
    });
  }
};

module.exports = fetchuser;

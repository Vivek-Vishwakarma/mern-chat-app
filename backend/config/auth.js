const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token)
      return res.status(401).send("No authentication token, access denied");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .send("Token verification failed, authorization denied");
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = auth;

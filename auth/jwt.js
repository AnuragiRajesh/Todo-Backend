const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const secreteToken = crypto.randomBytes(64).toString("hex");
AuthorizationToken = (data) => {
  const { id } = data;
  const token = jwt.sign(id, "secreteTokenlaksjdflajdsflsajdfldsajf");
  return token;
};

AuthenticationToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  console.log(cookie  )
  if (cookie) {
    const token = cookie.split("=")[1];
    const decodeToken = jwt.verify(token, "secreteTokenlaksjdflajdsflsajdfldsajf")
    req.user_id = Number(decodeToken);
    next();
  } else {
    res.send("Have not Login yet ?");
  }
};

module.exports = {
  AuthorizationToken,
  AuthenticationToken,
};

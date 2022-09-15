const jwt = require("jsonwebtoken");

exports.authRequired = required = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.status(402)
        .json({ error: "Please login to use our platform"});
    }

    const token = authorization.split(" ")[1]
    if (!token) {
        return res
          .status(402)
          .json({ error: "Please login to use our platform" });
    }

    const user = jwt.verify(
      token,
      "740ff4139d78f5b58d31a703996b1ab72d9a038fa20b3f7da05ec619cec8ee77"
    );

    req.user = user;

    next();
};
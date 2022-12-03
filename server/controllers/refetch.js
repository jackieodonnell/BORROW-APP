const jwt = require("jsonwebtoken");
const { getLoansByUsername, getUserByUsername } = require("../utils/db");

const refetchControl = (req, res) => {
  let username = req.params.user;
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "No token found" });
  } else {
    jwt.verify(token, `${process.env.TOKEN_SECRET}`, async (err, verified) => {
      if (err)
        return res.status(401).json({ message: "Invalid/Expired Token" });

      let results = await getUserByUsername(username);
      const user = results.rows[0];

      results = await getLoansByUsername(user.username);
      const loans = results.rows;
      return res.status(200).json({ user: username, loans: loans });
    });
  }
};

module.exports = { refetchControl };

const { pool } = require("../database/queries");

async function updateUser(sql) {
  try {
    return await pool.query(sql);
  } catch (err) {
    return err.stack
  }
}

const updateUserControl = async (req, res) => {
  const {
    username,
    reputation,
    total_borrowing,
    total_lending,
    total_score,
  } = req.body;

  let results = await updateUser(`UPDATE users SET reputation = ${reputation}, 
    total_borrowing = ${total_borrowing}, total_lending = ${total_lending}, total_score = ${total_score}
    WHERE username = '${username}' RETURNING *;`);
  const updatedUser = results.rows[0];

  return res.status(200).json({
    updatedUser: updatedUser,
  });
};

module.exports = { updateUserControl };
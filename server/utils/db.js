const { pool } = require("../database/queries");

async function selectFrom(data, table, condition) {
  try {
    return await pool.query(`SELECT ${data} FROM ${table} ${condition}`);
  } catch (err) {
    return err.stack;
  }
}

async function getUserByUsername(username) {
  return await selectFrom("*", "users", `WHERE username = '${username}'`);
}

async function getLoansByUsername(username) {
  return await selectFrom(
    "*",
    "loans",
    `WHERE lender = '${username}' OR borrower = '${username}'`
  );
}

module.exports = { getUserByUsername, getLoansByUsername };

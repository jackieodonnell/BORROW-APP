const { pool } = require("../database/queries");

async function selectFrom(data, table) {
  try {
    return await pool.query(`SELECT ${data} FROM ${table}`);
  } catch (err) {
    return err.stack;
  }
}

async function getUsers() {
  return await selectFrom("*", "users");
}

async function getLoans() {
  return await selectFrom("*", "loans");
}

const adminControl = async (req, res) => {

    let results = await getUsers();
<<<<<<< HEAD
    const users = results.rows;
=======
     const users = results.rows;
>>>>>>> 2636e66 (added update_loan, update_user, and admin routes)

    results = await getLoans();
    const loans = results.rows;

    return res.status(200).json({
        users: users,
        loans: loans,
    });
};

module.exports = { adminControl };
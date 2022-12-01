const { pool } = require("../database/queries");

async function queryData(sql) {
  try {
    return await pool.query(sql);
  } catch (err) {
    return err.stack
  }
}

const updateLoanControl = async (req, res) => {
  const {
    loan_id,
    lender,
    borrower,
    status,
    creation_date,
    due_date,
    amount,
    description,
    payment_date,
    transaction_rating,
  } = req.body;

  let results = await queryData(`UPDATE loans SET loan_id = ${loan_id}, lender = '${lender}', borrower = '${borrower}', status = '${status}', 
    creation_date = '${creation_date}', due_date = '${due_date}', amount = ${amount}, description = '${description}', 
    payment_date = '${payment_date}', transaction_rating = '${transaction_rating}' WHERE loan_id = ${loan_id} RETURNING *;`);
  const updatedLoan = results.rows[0];

  results = await queryData(`SELECT * FROM loans WHERE lender = '${lender}' OR borrower = '${lender}';`);
  const loans = results.rows;

  return res.status(200).json({
    updatedLoan: updatedLoan,
    loans: loans,
  });
};

module.exports = { updateLoanControl };

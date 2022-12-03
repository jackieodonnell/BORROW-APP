const { pool } = require("../database/queries");

async function queryLoans(sql) {
  try {
    return await pool.query(sql);
  } catch (err) {
    return err.stack;
  }
}

const createLoanControl = async (req, res) => {
  const {
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

  let results =
    await queryLoans(`INSERT INTO loans (loan_id, lender, borrower, status, creation_date, due_date, amount, description, payment_date, transaction_rating)
    VALUES (DEFAULT, '${lender}', '${borrower}', '${status}', '${creation_date}', '${due_date}', ${amount},
    '${description}', '${payment_date}', 0) RETURNING *;`);

  if (!results.hasOwnProperty("rows"))
    return res.status(500).json({ message: `Oops, something went wrong` });

  const createdLoan = results.rows[0];

  results = await queryLoans(
    `SELECT * FROM loans WHERE lender = '${borrower}' OR borrower = '${borrower}';`
  );
  const loans = results.rows;

  return res.status(201).json({
    createdLoan: createdLoan,
    loans: loans,
  });
};

module.exports = { createLoanControl };

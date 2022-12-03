const { pool } = require("../database/queries");

async function queryData(sql) {
  try {
    return await pool.query(sql);
  } catch (err) {
    return err.stack;
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

  let results =
    await queryData(`UPDATE loans SET loan_id = ${loan_id}, lender = '${lender}', borrower = '${borrower}', status = '${status}', 
    creation_date = '${creation_date}', due_date = '${due_date}', amount = ${amount}, description = '${description}', 
    payment_date = '${payment_date}', transaction_rating = '${transaction_rating}' WHERE loan_id = ${loan_id} RETURNING *;`);

  if (!results.hasOwnProperty("rows"))
    return res.status(500).json({ message: `No entry found with that ID` });

  const updatedLoan = results.rows[0];

  results = await queryData(
    `SELECT * FROM loans WHERE lender = '${lender}' OR borrower = '${lender}';`
  );
  const loans = results.rows;

  let updatedBorrower;
  let updatedLender;

  if (status == "paid") {
    results = await queryData(
      `SELECT * FROM users WHERE username = '${borrower}';`
    );
    const borrowerUser = results.rows[0];
    let totalBorrowing = (borrowerUser.total_borrowing += 1);
    let totalScore = (borrowerUser.total_score += transaction_rating);
    let reputation = totalScore / totalBorrowing;

    results =
      await queryData(`UPDATE users SET total_borrowing = ${totalBorrowing}, total_score = ${totalScore}, reputation = ${reputation} 
      WHERE username = '${borrower}' RETURNING *;`);
    updatedBorrower = results.rows[0];

    results = await queryData(
      `SELECT * FROM users WHERE username = '${lender}';`
    );
    const lenderUser = results.rows[0];
    let totalLending = (lenderUser.total_lending += 1);

    results = await queryData(
      `UPDATE users SET total_lending = ${totalLending} WHERE username = '${lender}' RETURNING *;`
    );
    updatedLender = results.rows[0];
  }

  return res.status(200).json({
    updatedLoan: updatedLoan,
    updatedBorrower: updatedBorrower || [],
    updatedLender: updatedLender || [],
    loans: loans,
  });
};

module.exports = { updateLoanControl };

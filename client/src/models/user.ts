export type User = {
  user: string;
  reputation: string;
  token: string;
  loans: Loans[];
};

export type Loans = {
  loan_id: number;
  lender: string;
  borrower: string;
  status: string;
  creation_date: string;
  due_date: string;
  amount: string;
  description: string;
  payment_date: string;
  transaction_rating: number;
};

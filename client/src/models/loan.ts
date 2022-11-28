export interface LoanRequest {
  lender: string;
  borrower: string;
  status: string;
  creation_date: string;
  due_date: string;
  amount: string;
  description: string;
  payment_date: string;
  transaction_rating: number;
}

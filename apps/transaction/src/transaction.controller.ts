import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionRequest, GetUserTransactionsRequest, TransactionServiceController, TransactionServiceControllerMethods } from '@app/common/types/transaction';

@Controller()
@TransactionServiceControllerMethods()
export class TransactionController implements TransactionServiceController {
  constructor(private readonly transactionService: TransactionService) {}

  createTransaction(createTransactionDto:CreateTransactionRequest) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  getUserTransactions(getUserTransactions: GetUserTransactionsRequest) {
    return this.transactionService.getUserTransactions(getUserTransactions.userId)
  }


}

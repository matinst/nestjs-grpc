import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'apps/gateway/src/users/users.service';
import { CreateTransactionRequest, Transaction, Transactions } from '@app/common/types/transaction'
import { User } from '@app/common/types/auth';
import { randomUUID } from 'crypto';
@Injectable()
export class TransactionService {
  private readonly transactions: Transaction[] = [];
  constructor(private userService:UsersService){}

  checkUserExist(userId: string){
    let user:User;
    const userIsExist = this.userService.findOne(userId)
    if (!userIsExist) throw new NotFoundException("User Not Found.");
    userIsExist.subscribe({
      next:(user:User) => {
        user
      }
    });
    return user;
  }

  createTransaction(createTransactionDto: CreateTransactionRequest) {
    const sender = this.checkUserExist(createTransactionDto.senderId)
    const receiver = this.checkUserExist(createTransactionDto.receiverId)
    if (!sender) throw new NotFoundException("sender Not Found.")
    if (!receiver) throw new NotFoundException("receiver Not Found.")

    if (!sender.balance || sender.balance < createTransactionDto.amount) {
      throw new BadRequestException(`Sender does not have enough balance to transfer ${createTransactionDto.amount}`)
    }

    sender.balance -= createTransactionDto.amount
    receiver.balance += createTransactionDto.amount

    this.userService.update(sender.id,sender)
    const transaction = {
      ...createTransactionDto,
      id: randomUUID(),
      senderId: sender.id,
      receiverId: receiver.id,
      time: Date.now().toString(),
      success: true
    }
    this.transactions.push(transaction)
    return transaction
  }

  getUserTransactions(userId: string): Transactions {
    const userTransactions = this.transactions.filter(transaction => 
      transaction.senderId === userId || transaction.receiverId === userId
    );
  
    return { transactions: userTransactions }; // Wrap the array in an object
  }
}

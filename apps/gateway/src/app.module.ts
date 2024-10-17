import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TransactionModule } from './transaction/transaction.module';
@Module({
  imports: [UsersModule,TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

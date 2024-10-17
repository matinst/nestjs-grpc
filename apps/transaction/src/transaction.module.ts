import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { UsersModule } from 'apps/auth/src/users/users.module';
import { UsersService } from 'apps/gateway/src/users/users.service';
import { AuthModule } from 'apps/auth/src/auth.module';

@Module({
  imports: [UsersModule,AuthModule],
  controllers: [TransactionController],
  providers: [TransactionService,UsersService],
})
export class TransactionModule {}

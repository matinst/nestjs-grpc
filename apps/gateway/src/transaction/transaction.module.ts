import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, TRANSACTION_SERVICE } from '../users/constants';
import { AUTH, TRANSACTION } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: AUTH,
          protoPath: join(__dirname, '../auth.proto')
        }
      },
      {
        name: TRANSACTION_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: TRANSACTION,
          protoPath: join(__dirname, '../transaction.proto')
        }
      }
    ]
    )],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule { }

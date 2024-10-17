import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { UsersModule } from 'apps/auth/src/users/users.module';
import { UsersService } from 'apps/gateway/src/users/users.service';
import { AuthModule } from 'apps/auth/src/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'apps/gateway/src/users/constants';
import { AUTH } from '@app/common';
import { join } from 'path';

@Module({
  imports: [UsersModule,AuthModule,
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options:{
          package: AUTH,
          protoPath: join(__dirname,'../auth.proto')
        }
      }
    ])
  ],
  controllers: [TransactionController],
  providers: [TransactionService,UsersService],
})
export class TransactionsssModule {}

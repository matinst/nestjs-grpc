import { NestFactory } from '@nestjs/core';
import { TransactionsssModule } from './transaction.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TRANSACTION } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TransactionsssModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../transaction.proto'),
        package: TRANSACTION
      }
    }
  )
  await app.listen();
}
bootstrap();

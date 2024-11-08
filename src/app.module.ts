import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from '@database/database.providers';
import { AuthModule } from '@auth/auth.module';
import { AppController } from './app.controller';
import { UserModule } from '@user/user.module';
import { EventModule } from '@event/event.module';
import { TicketModule } from '@ticket/ticket.module';
import configuration from '@config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],

    }),
    DatabaseProviders,
    AuthModule,
    UserModule,
    EventModule,
    TicketModule
  ],
  controllers: [AppController],
})
export class AppModule {}
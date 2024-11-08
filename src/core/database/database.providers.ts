import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../modules/auth/user.entity';
import { Event } from '../../modules/event/event.entity';
import { Ticket } from 'src/modules/ticket/ticket.entity';

export const DatabaseProviders = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    database: configService.get<string>('database.database'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    entities: [User, Event, Ticket],
    synchronize: true,
    logging: true,
  }),
});

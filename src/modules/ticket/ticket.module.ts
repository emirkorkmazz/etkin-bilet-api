import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from '@ticket/ticket.controller';
import { TicketService } from '@ticket/ticket.service';
import { Ticket } from '@ticket/ticket.entity';
import { Event } from '@event/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Event])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
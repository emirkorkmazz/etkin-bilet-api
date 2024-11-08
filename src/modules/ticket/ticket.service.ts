import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '@ticket/ticket.entity';
import { Event } from '@event/event.entity';
import { User } from '@auth/user.entity';
import { PurchaseTicketDto } from '@ticket/dtos/purchase-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async purchaseTicket(purchaseTicketDto: PurchaseTicketDto, user: User) {
    try {
      const event = await this.eventRepository.findOne({
        where: { id: purchaseTicketDto.eventId, isActive: true }
      });

      if (!event) {
        return {
          status: false,
          message: 'Etkinlik bulunamadı'
        };
      }

      if (event.availableTickets < purchaseTicketDto.quantity) {
        return {
          status: false,
          message: 'Yeterli sayıda bilet bulunmamaktadır'
        };
      }

      const totalAmount = event.ticketPrice * purchaseTicketDto.quantity;

      const ticket = this.ticketRepository.create({
        event,
        user,
        quantity: purchaseTicketDto.quantity,
        totalAmount
      });

      await this.ticketRepository.save(ticket);

      // Kalan bilet sayısını güncelle
      event.availableTickets -= purchaseTicketDto.quantity;
      await this.eventRepository.save(event);

      return {
        status: true,
        message: 'Bilet başarıyla satın alındı',
        ticket: {
          id: ticket.id,
          eventTitle: event.title,
          quantity: ticket.quantity,
          totalAmount: ticket.totalAmount,
          purchaseDate: ticket.purchaseDate
        }
      };
    } catch (error) {
      return {
        status: false,
        message: 'Bilet satın alınırken bir hata oluştu'
      };
    }
  }
}
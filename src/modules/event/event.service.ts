import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '@event/event.entity';
import { CreateEventDto } from '@event/dtos/create-event.dto';
import { User } from '@auth/user.entity';
import { SearchEventsDto } from '@event/dtos/search-events.dto';
import { UpdateEventDto } from '@event/dtos/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto, user: User) {
    try {
      const event = this.eventRepository.create({
        ...createEventDto,
        organizer: user,
        availableTickets: createEventDto.totalTickets,
      });

      await this.eventRepository.save(event);

      return {
        status: true,
        message: 'Etkinlik başarıyla oluşturuldu',
        event: {
          id: event.id,
          title: event.title,
          date: event.date,
          city: event.city,
          district: event.district,
        }
      };
    } catch (error) {
      return {
        status: false,
        message: 'Etkinlik oluşturulurken bir hata oluştu'
      };
    }
  }

  async searchEvents(searchEventsDto: SearchEventsDto) {
    try {
      const { page = 1, pageSize = 20 } = searchEventsDto;
      
      const skip = (page - 1) * pageSize;
  
      const [events, total] = await this.eventRepository.findAndCount({
        where: { isActive: true },
        order: { date: 'ASC' },
        skip,
        take: pageSize,
        relations: ['organizer']
      });
  
      return {
        status: true,
        totalCount: total,
        page,
        pageSize,
        events
      };
    } catch (error) {
      return {
        status: false,
        message: 'Etkinlikler getirilirken bir hata oluştu'
      };
    }
  }

  async getEventById(id: string) {
    try {
      const event = await this.eventRepository.findOne({
        where: { id, isActive: true }
      });

      if (!event) {
        return {
          status: false,
          message: 'Etkinlik bulunamadı'
        };
      }

      return {
        status: true,
        message: 'Etkinlik başarıyla getirildi',
        event
      };
    } catch (error) {
      return {
        status: false,
        message: 'Etkinlik getirilirken bir hata oluştu'
      };
    }
  }


  async updateEvent(id: string, updateEventDto: UpdateEventDto, user: User) {
    try {
      const event = await this.eventRepository.findOne({
        where: { id, isActive: true },
        relations: ['organizer']
      });
  
      if (!event) {
        return {
          status: false,
          message: 'Etkinlik bulunamadı'
        };
      }
  
      // Etkinliği sadece organizatör güncelleyebilir
      if (event.organizer.id !== user.id) {
        return {
          status: false,
          message: 'Bu etkinliği güncelleme yetkiniz yok'
        };
      }
  
      // Eğer totalTickets güncelleniyorsa, availableTickets'ı da güncelle
      if (updateEventDto.totalTickets) {
        const ticketDifference = updateEventDto.totalTickets - event.totalTickets;
        updateEventDto['availableTickets'] = event.availableTickets + ticketDifference;
      }
  
      await this.eventRepository.update(id, updateEventDto);
  
      const updatedEvent = await this.eventRepository.findOne({
        where: { id }
      });
  
      return {
        status: true,
        message: 'Etkinlik başarıyla güncellendi',
        event: updatedEvent
      };
    } catch (error) {
      return {
        status: false,
        message: 'Etkinlik güncellenirken bir hata oluştu'
      };
    }
  }



  async deleteEvent(id: string, user: User) {
    try {
      const event = await this.eventRepository.findOne({
        where: { id, isActive: true },
        relations: ['organizer']
      });
  
      if (!event) {
        return {
          status: false,
          message: 'Etkinlik bulunamadı'
        };
      }
  
      // Etkinliği sadece organizatör silebilir
      if (event.organizer.id !== user.id) {
        return {
          status: false,
          message: 'Bu etkinliği silme yetkiniz yok'
        };
      }
  
      // Soft delete - isActive'i false yapalım
      event.isActive = false;
      await this.eventRepository.save(event);
  
      return {
        status: true,
        message: 'Etkinlik başarıyla silindi'
      };
    } catch (error) {
      return {
        status: false,
        message: 'Etkinlik silinirken bir hata oluştu'
      };
    }
  }
}
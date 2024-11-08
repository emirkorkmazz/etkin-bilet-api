import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '@event/event.entity';
import { CreateEventDto } from '@event/dtos/create-event.dto';
import { User } from '@auth/user.entity';
import { SearchEventsDto } from '@event/dtos/search-events.dto';
import { UpdateEventDto } from '@event/dtos/update-event.dto';

interface EventCreator {
    id: string;
    username: string;
  }

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}



  async createEvent(createEventDto: CreateEventDto, user: EventCreator) {
    try {
      const event = this.eventRepository.create({
        ...createEventDto,
        organizer: user,
        organizerId: user.id,
        availableTickets: createEventDto.totalTickets,
      });
  
      const savedEvent = await this.eventRepository.save(event);
  
      const createdEvent = await this.eventRepository.findOne({
        where: { id: savedEvent.id },
        relations: ['organizer']
      });
  
      if (!createdEvent || !createdEvent.organizer) {
        throw new Error('Event creation failed');
      }
  
      return {
        status: true,
        message: 'Etkinlik başarıyla oluşturuldu',
        data: {
          id: createdEvent.id,
          title: createdEvent.title,
          description: createdEvent.description,
          date: createdEvent.date,
          city: createdEvent.city,
          district: createdEvent.district,
          address: createdEvent.address,
          totalTickets: createdEvent.totalTickets,
          availableTickets: createdEvent.availableTickets,
          ticketPrice: createdEvent.ticketPrice,
          isActive: createdEvent.isActive,
          image: createdEvent.image,
          createdAt: createdEvent.createdAt,
          updatedAt: createdEvent.updatedAt,
          organizer: {
            id: createdEvent.organizer.id,
            username: createdEvent.organizer.username,
            name: createdEvent.organizer.name,
            surname: createdEvent.organizer.surname
          }
        }
      };
    } catch (error) {
      throw new Error(`Event creation failed: ${error.message}`);
    }
  }


  async searchEvents(searchEventsDto: SearchEventsDto) {
    const { 
      page = 1, 
      pageSize = 20, 
      title, 
      city, 
      date 
    } = searchEventsDto;
    
    const skip = (page - 1) * pageSize;
  
    const queryBuilder = this.eventRepository.createQueryBuilder('event')
      .leftJoinAndSelect('event.organizer', 'organizer')
      .where('event.isActive = :isActive', { isActive: true });
  
    if (title) {
      queryBuilder.andWhere('LOWER(event.title) LIKE LOWER(:title)', { 
        title: `%${title}%` 
      });
    }
  
    if (city) {
      queryBuilder.andWhere('LOWER(event.city) = LOWER(:city)', { city });
    }
  
    if (date) {
      queryBuilder.andWhere('event.date >= :date', { date });
    }
  
    queryBuilder
      .orderBy('event.date', 'ASC')
      .skip(skip)
      .take(pageSize);
  
    const [events, total] = await queryBuilder.getManyAndCount();
  
    return {
      status: true,
      message: 'Etkinlikler başarıyla getirildi',
      data: {
        events: events.map(event => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          city: event.city,
          district: event.district,
          address: event.address,
          totalTickets: event.totalTickets,
          availableTickets: event.availableTickets,
          ticketPrice: event.ticketPrice,
          isActive: event.isActive,
          image: event.image,
          createdAt: event.createdAt,
          updatedAt: event.updatedAt,
          organizer: event.organizer ? {
            id: event.organizer.id,
            username: event.organizer.username,
            name: event.organizer.name,
            surname: event.organizer.surname
          } : null
        })),
        totalCount: total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  }


  async getEventById(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id, isActive: true }
    });

    if (!event) {
      throw new NotFoundException('Etkinlik bulunamadı');
    }

    return {
      message: 'Etkinlik başarıyla getirildi',
      data: event
    };
  }


  async updateEvent(id: string, updateEventDto: UpdateEventDto, user: User) {
    const event = await this.eventRepository.findOne({
      where: { id, isActive: true },
      relations: ['organizer']
    });

    if (!event) {
      throw new NotFoundException('Etkinlik bulunamadı');
    }

    if (event.organizer.id !== user.id) {
      throw new UnauthorizedException('Bu etkinliği güncelleme yetkiniz yok');
    }

    if (updateEventDto.totalTickets) {
      const ticketDifference = updateEventDto.totalTickets - event.totalTickets;
      updateEventDto['availableTickets'] = event.availableTickets + ticketDifference;
    }

    await this.eventRepository.update(id, updateEventDto);

    const updatedEvent = await this.eventRepository.findOne({
      where: { id }
    });

    return {
      message: 'Etkinlik başarıyla güncellendi',
      data: updatedEvent
    };
  }



  async deleteEvent(id: string, user: User) {
    const event = await this.eventRepository.findOne({
      where: { id, isActive: true },
      relations: ['organizer']
    });

    if (!event) {
      throw new NotFoundException('Etkinlik bulunamadı');
    }

    if (event.organizer.id !== user.id) {
      throw new UnauthorizedException('Bu etkinliği silme yetkiniz yok');
    }

    event.isActive = false;
    await this.eventRepository.save(event);

    return {
      message: 'Etkinlik başarıyla silindi'
    };
  }
}
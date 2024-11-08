import { Controller, Post, Get, Body, Param, UseGuards, Request, Put, Delete } from '@nestjs/common';
import { EventService } from '@event/event.service';
import { CreateEventDto } from '@event/dtos/create-event.dto';
import { SearchEventsDto } from '@event/dtos/search-events.dto';
import { JwtAuthGuard } from '@user/jwt.auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateEventDto } from '@event/dtos/update-event.dto';

@ApiTags('Events')
@Controller('Events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('AddEvent')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Yeni etkinlik oluştur' })
  @ApiResponse({ status: 201, description: 'Etkinlik başarıyla oluşturuldu' })
  async createEvent(@Request() req, @Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto, req.user);
  }

  @Post('SearchEvents')
  @ApiOperation({ summary: 'Etkinlikleri filtrele ve sayfalandır' })
  @ApiResponse({ status: 200, description: 'Etkinlikler başarıyla getirildi' })
  async searchEvents(@Body() searchEventsDto: SearchEventsDto) {
    return this.eventService.searchEvents(searchEventsDto);
  }

  @Get('GetEventsDetail/:id')
  @ApiOperation({ summary: 'Belirli bir etkinliği getir' })
  @ApiResponse({ status: 200, description: 'Etkinlik başarıyla getirildi' })
  async getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }

  @Put('UpdateEvent/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Etkinlik güncelle' })
  @ApiResponse({ status: 200, description: 'Etkinlik başarıyla güncellendi' })
  async updateEvent(
  @Param('id') id: string,
  @Body() updateEventDto: UpdateEventDto,
    @Request() req
  ) {
    return this.eventService.updateEvent(id, updateEventDto, req.user);
  }

  @Delete('DeleteEvent/:id')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiOperation({ summary: 'Etkinlik sil' })
@ApiResponse({ status: 200, description: 'Etkinlik başarıyla silindi' })
async deleteEvent(@Param('id') id: string, @Request() req) {
  return this.eventService.deleteEvent(id, req.user);
}
}
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TicketService } from '@ticket/ticket.service';
import { PurchaseTicketDto } from '@ticket/dtos/purchase-ticket.dto';
import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Tickets')
@Controller('Tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('PurchaseTicket')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Bilet satın al' })
  @ApiResponse({ status: 201, description: 'Bilet başarıyla satın alındı' })
  async purchaseTicket(@Request() req, @Body() purchaseTicketDto: PurchaseTicketDto) {
    return this.ticketService.purchaseTicket(purchaseTicketDto, req.user);
  }
}
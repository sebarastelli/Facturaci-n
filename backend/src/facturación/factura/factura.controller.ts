import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { Factura } from '../entidades/Factura';
import { CrearFacturaDto } from '../dto/factura-dto';

@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Get()
  async getAllFacturas(): Promise<Factura[]> {
    return await this.facturaService.getAllFacturas();
  }

  @Post()
  async create(@Body() crearFacturaDto: CrearFacturaDto): Promise<Factura> {
    return await this.facturaService.create(crearFacturaDto);
  }

  @Delete(':id')
  async deleteFactura(@Param('id') id: number): Promise<string> {
    return this.facturaService.deleteById(id);
  }

}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { Factura } from '../entidades/Factura';
import { ListaProductos } from '../entidades/ListaProductos';
import { ClienteModule } from '../cliente/cliente.module';
import { FacturaProducto } from '../entidades/FacturaProductos';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, ListaProductos, FacturaProducto]),
  ClienteModule],
  providers: [FacturaService],
  controllers: [FacturaController],
})
export class FacturaModule {}
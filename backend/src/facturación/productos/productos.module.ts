import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { ListaProductos } from '../entidades/ListaProductos';

@Module({
  imports: [TypeOrmModule.forFeature([ListaProductos])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
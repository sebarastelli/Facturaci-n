import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from '../dto/producto-dto';
import { ListaProductos } from '../entidades/ListaProductos';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async create(@Body() createProductoDto: CrearProductoDto): Promise<ListaProductos> {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  async getAllProducts(): Promise<ListaProductos[]> {
    return await this.productosService.getAllProducts();
  }
}
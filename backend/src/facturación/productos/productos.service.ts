import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListaProductos } from '../entidades/ListaProductos';
import { CrearProductoDto } from '../dto/producto-dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(ListaProductos)
    private productosRepository: Repository<ListaProductos>,
  ) {}

  async create(createProductoDto: CrearProductoDto): Promise<ListaProductos> {
    const producto = this.productosRepository.create(createProductoDto);
    return this.productosRepository.save(producto);
  }

  async getAllProducts(): Promise<ListaProductos[]> {
    return await this.productosRepository.find();
  }
}
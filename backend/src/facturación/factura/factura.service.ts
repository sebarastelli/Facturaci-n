import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Factura } from "../entidades/Factura";
import { CrearFacturaDto } from "../dto/factura-dto";
import { Cliente } from "../entidades/Cliente";
import { ListaProductos } from "../entidades/ListaProductos";
import { FacturaProducto } from "../entidades/FacturaProductos";

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(ListaProductos)
    private readonly productosRepository: Repository<ListaProductos>,
    @InjectRepository(FacturaProducto)
    private readonly facturaProductoRepository: Repository<FacturaProducto>,
  ) {}

  async getAllFacturas(): Promise<Factura[]> {
    return await this.facturaRepository.find({
      relations: ["clienteId", "productos"],
    });
  }

  async deleteById(id: number): Promise<string> {
    // Eliminar las relaciones en FacturaProducto primero
    await this.facturaProductoRepository.delete({  id });

    // Ahora eliminar la factura
    const result = await this.facturaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Factura con ID ${id} no encontrada`);
    }

    return `Factura con ID ${id} eliminada con éxito`;
  }

  async create(createFacturaDto: CrearFacturaDto): Promise<Factura> {
    // Buscar al cliente
    const cliente = await this.clienteRepository.findOne({
      where: { id: createFacturaDto.clienteId },
    });
    if (!cliente) {
      throw new NotFoundException("Cliente no encontrado");
    }

    // Crear las relaciones con los productos
    let total = 0; // Inicializamos el total en 0

    const productosFactura = await Promise.all(
      createFacturaDto.productos.map(async (productoDto) => {
        // Verificar que el producto existe
        const producto = await this.productosRepository.findOne({
          where: { id: productoDto.productoId },
        });

        if (!producto) {
          throw new NotFoundException(
            `Producto con ID ${productoDto.productoId} no encontrado`,
          );
        }

        // Calcular el subtotal para este producto
        const subtotal = producto.precio * productoDto.cantidad;
        total += subtotal; // Sumar al total

        // Crear la entidad FacturaProducto
        const facturaProducto = this.facturaProductoRepository.create({
          producto,
          cantidad: productoDto.cantidad,
        });

        // Guardar la relación FacturaProducto
        return this.facturaProductoRepository.save(facturaProducto);
      }),
    );

    // Crear la factura con el total calculado
    const factura = this.facturaRepository.create({
      clienteId: cliente,
      productos: productosFactura, // Relación con FacturaProducto
      total, // Asignar el total calculado
    });

    // Guardar la factura en la base de datos
    return this.facturaRepository.save(factura);
  }
}

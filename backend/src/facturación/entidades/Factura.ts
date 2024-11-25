import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { FacturaProducto } from './FacturaProductos';
import { ListaProductos } from './ListaProductos';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @Column('decimal')
  total: number;

  @OneToMany(() => FacturaProducto, (facturaProducto) => facturaProducto.factura, {
    eager: true,  // Esto asegura que los productos se carguen automáticamente con la factura
  })
  productos: FacturaProducto[];

  @ManyToOne(() => Cliente, (cliente) => cliente.facturas)
  clienteId: Cliente;
}
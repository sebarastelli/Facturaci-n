import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FacturaProducto } from './FacturaProductos';

@Entity()
export class ListaProductos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'decimal' })
  precio: number;

  @Column()
  descripcion: string;

  @OneToMany(() => FacturaProducto, (facturaProducto) => facturaProducto.producto)
  facturaProductos: FacturaProducto[];
}
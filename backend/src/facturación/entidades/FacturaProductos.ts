import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Factura } from './Factura';
import { ListaProductos } from './ListaProductos';

@Entity()
export class FacturaProducto {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Factura, (factura) => factura.productos, { onDelete: 'CASCADE' })
    @JoinColumn()
    factura: Factura;
  
    @ManyToOne(() => ListaProductos, (producto) => producto.facturaProductos)
    @JoinColumn()
    producto: ListaProductos;
  
    @Column('int')
    cantidad: number;
}
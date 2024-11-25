import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Factura } from './Factura';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  localidad: string;

  @Column({ nullable: true })
  telefono: number;

  @Column()
  CUIT: number;

  @OneToMany(() => Factura, (factura) => factura.clienteId)
  facturas: Factura[];
}

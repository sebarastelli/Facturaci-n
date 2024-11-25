import { IsArray, ArrayNotEmpty, IsInt, IsPositive, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

 export class ProductoFacturaDto {
  @IsInt()
  productId: number;

  @IsPositive()
  quantity: number;
}

export class CrearFacturaDto {
  @IsInt()
  clienteId: number;

  @IsArray()
  @ArrayNotEmpty()
  productos: { productoId: number, cantidad: number }[];
}
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CrearProductoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsString()
  descripcion: string;
}
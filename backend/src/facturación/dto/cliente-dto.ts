import { IsString, IsNumber } from 'class-validator';

export class CrearClienteDto{
    @IsString()
    nombre: string;

    @IsString()
    direccion: string;

    @IsString()
    localidad: string;

    @IsNumber()
    telefono: number;

    @IsNumber()
    CUIT: number;
}
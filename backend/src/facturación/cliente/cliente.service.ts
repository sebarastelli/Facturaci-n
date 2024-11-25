import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Cliente} from '../entidades/Cliente';
import { CrearClienteDto } from '../dto/cliente-dto';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
    )
    {}

    async create(crearClienteDto: CrearClienteDto): Promise<Cliente> {
        const cliente = this.clienteRepository.create(crearClienteDto);
        return this.clienteRepository.save(cliente);
    } 

    async getAllClients(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
      }
}
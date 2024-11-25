import { Controller, Post, Body, Get } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { Cliente } from "../entidades/Cliente";
import { CrearClienteDto } from "../dto/cliente-dto";

@Controller("cliente")
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() crearClienteDto: CrearClienteDto): Promise<Cliente> {
    return this.clienteService.create(crearClienteDto);
  }

  @Get()
  async getAllClients(): Promise<Cliente[]> {
    return await this.clienteService.getAllClients();
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './facturación/productos/productos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListaProductos } from './facturación/entidades/ListaProductos';  // Asegúrate de que el path sea correcto
import { Factura } from './facturación/entidades/Factura';  // Asegúrate de que el path sea correcto
import { Cliente } from './facturación/entidades/Cliente';  // Asegúrate de que el path sea correcto
import { ClienteModule } from './facturación/cliente/cliente.module';
import { FacturaModule } from './facturación/factura/factura.module';
import { FacturaProducto } from './facturación/entidades/FacturaProductos';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/dbtest.sqlite',
      entities: [ListaProductos, Factura, Cliente, FacturaProducto],  // Asegúrate de incluir todas las entidades necesarias
      synchronize: true,
    }),
    ProductosModule,
    ClienteModule,
    FacturaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
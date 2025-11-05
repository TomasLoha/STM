import { Module } from '@nestjs/common';
import { DetalleRecetaService } from './detalle_receta.service';
import { DetalleRecetaController } from './detalle_receta.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [DetalleRecetaController],
	providers: [DetalleRecetaService],
	exports: [DetalleRecetaService],
})
export class DetalleRecetaModule {}

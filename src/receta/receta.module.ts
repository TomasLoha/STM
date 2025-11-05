import { Module } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { RecetaController } from './receta.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [RecetaController],
	providers: [RecetaService],
	exports: [RecetaService],
})
export class RecetaModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { FormModule } from './form/form.module';
import { MeetingModule } from './meeting/meeting.module';
import { RecetaModule } from './receta/receta.module';
import { DetalleRecetaModule } from './detalle_receta/detalle_receta.module';

@Module({
	imports: [
		UserModule,
		PrismaModule,
		FormModule,
		MeetingModule,
		RecetaModule,
		DetalleRecetaModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

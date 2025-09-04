import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { SeedService } from './seed/seed.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // variables de entorno
    UsersModule,
    PrismaModule,
    AuthModule,
    NotesModule,
  ],
  // proteger las rutas con autenticacion
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SeedService,
  ],
})
export class AppModule {}

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { Role } from '@prisma/client';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    await this.createAdminUser();
  }

  private async createAdminUser() {
    const adminEmail = this.config.get<string>('ADMIN_EMAIL');
    const adminPassword = this.config.get<string>('ADMIN_PASSWORD');
    const adminName = this.config.get<string>('ADMIN_NAME');

    // validar las variables
    if (!adminEmail || !adminPassword || !adminName) {
      this.logger.warn(
        'Las variables de entorno para admin no fueron configuradas',
      );
      return;
    }

    // verificar si el admin ya existe
    const existingAdmin = await this.prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      this.logger.log('El admin ya existe en la base de datos');
      return;
    }

    const hashedPassword = await argon.hash(adminPassword);

    // crear el admin
    await this.prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    this.logger.log(`El admin fue creado con éxito: ${adminEmail}`);
  }
}

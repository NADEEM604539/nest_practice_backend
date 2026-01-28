import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from '../user/user.module'

@Module({
  providers: [AuthService],
  imports:[PrismaModule, UserModule],
  controllers: [AuthController]
})
export class AuthModule {}

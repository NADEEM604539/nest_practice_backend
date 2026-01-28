import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService){}


    getUser(email:string){
        return this.prisma.user.findFirst({
            where:{email}
        })

    }

    createUser(user:RegisterDto){
        return this.prisma.user.create({
            data:user
        })
    }
}

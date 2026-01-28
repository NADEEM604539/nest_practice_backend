import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
    constructor(private readonly authservice:AuthService){}


    @Post('login')
     login(@Body() user: LoginDto){
       return  this.authservice.login(user) 
    }

    @Post('register')
     register(@Body() user: RegisterDto){
       return  this.authservice.register(user) 
    }

}

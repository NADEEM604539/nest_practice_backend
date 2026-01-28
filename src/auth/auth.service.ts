import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { promises } from 'dns';

@Injectable()
export class AuthService {

    constructor(private readonly userservice: UserService,
        private readonly jwtService: JwtService
    ) { }
    async login(user: LoginDto) {
        const UserData = await this.userservice.getUser(user.email);

        if (!UserData) {
            throw new NotFoundException("User not found")
        }

        if (UserData.password !== user.password) {
            throw new UnauthorizedException("Email or Password is wrong");
        }


        const payload = { sub: UserData.id, username: UserData.name };
        return {
            // 💡 Here the JWT secret key that's used for signing the payload 
            // is the key that was passsed in the JwtModule
            access_token: await this.jwtService.signAsync(payload),
        };

    }

    async register(user: RegisterDto) {
        // Check if user already exists
        const existingUser = await this.userservice.getUser(user.email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash the password
        // Save the user
        const newUser = await this.userservice.createUser(user);

        // Prepare JWT payload
        const payload = { sub: newUser.id, username: newUser.name };

        // Return JWT token
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }


}


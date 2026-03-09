import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authSvc;
    private readonly jwtSvc;
    constructor(authSvc: AuthService, jwtSvc: JwtService);
    login(auth: AuthDto): Promise<string>;
    register(): string;
    refreshToken(): string;
    logOut(): string;
}

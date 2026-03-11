import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UtilService } from '../../common/services/util.service';
export declare class AuthController {
    private readonly authSvc;
    private readonly utilSvc;
    constructor(authSvc: AuthService, utilSvc: UtilService);
    login(auth: AuthDto): Promise<any>;
    getMe(): string;
    register(): string;
    refreshToken(): string;
    logOut(): string;
}

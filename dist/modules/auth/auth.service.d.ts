import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserByUsername(username: string): Promise<any>;
    logIn(): string;
    register(): string;
    refreshToken(): string;
    logOut(): string;
    getMe(): string;
}

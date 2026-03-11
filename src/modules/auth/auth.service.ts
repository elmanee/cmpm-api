import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserByUsername(username: string): Promise<any> {
    const result = await this.prisma.$queryRaw`SELECT * FROM "User" WHERE username = ${username} LIMIT 1`;
    return (result as any[])[0] ?? null;
  }

  public logIn(): string {
    return 'Login exitoso';
  }

  public register(): string {
    return 'Registro exitoso';
  }

  public refreshToken(): string {
    return 'Refresh token exitoso';
  }

  public logOut(): string {
    return 'Logout exitoso';
  }

  public getMe(): string {
    return 'getMe exitoso';
  }
}
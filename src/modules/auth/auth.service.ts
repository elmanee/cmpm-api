import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
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
}
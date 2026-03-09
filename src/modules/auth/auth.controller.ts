import { Controller, Get, HttpCode, Post, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly jwtSvc: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verifica credenciales de usuario y genera un JWT' })
  public async login(@Body() auth: AuthDto): Promise<string> {
    const jwt = await this.jwtSvc.signAsync(auth, { secret: process.env.JWT_SECRET_KEY });
    //TODO: Verificar usuario y contraseña
    //TODO: Obtener la información a enviar
    return jwt;
  }

  @Get('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  public register(): string {
    return this.authSvc.register();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Recibe un Refresh Token, valida que no hay expirado y entrega un nuevo Access Token' })
  public refreshToken(): string {
    return this.authSvc.refreshToken();
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Invalida los tokens en el lado del servidor y limpia las cookies' })
  public logOut(): string {
    return this.authSvc.logOut();
  }
}
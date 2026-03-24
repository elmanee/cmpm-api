import { Controller, Get, HttpCode, Post, HttpStatus, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { UtilService } from 'src/common/services/util.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly utilSvc: UtilService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verifica credenciales de usuario y genera un JWT' })
  public async login(@Body() auth: AuthDto): Promise<any> {
    const { username, password } = auth;
    const user = await this.authSvc.getUserByUsername(username);
    if (!user) {
      throw new Error('El usuario y/o contraseña es incorrecto');
    }
    if (await this.utilSvc.checkPassword(password, user.password!)) {
      const { password: _, ...payload } = user;
      const jwt = await this.utilSvc.generarJWT(payload);
      return { access_token: jwt, refresh_token: '' };
    } else {
      throw new Error('El usuario y/o contraseña es incorrecto');
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Extrae el id del usuario desde el token y busca la información' })
  public async getMe(@Req() request: any): Promise<any> {
    return request['user'];
  }

  @Get('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  public register(): string {
    return this.authSvc.register();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Recibe un Refresh Token y entrega un nuevo Access Token' })
  public refreshToken(): string {
    return this.authSvc.refreshToken();
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Invalida los tokens y limpia las cookies' })
  public logOut(): string {
    return this.authSvc.logOut();
  }
}
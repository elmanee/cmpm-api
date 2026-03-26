import { Controller, Get, HttpCode, Post, HttpStatus, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { UtilService } from 'src/common/services/util.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AppException } from 'src/common/exceptions/app.exception';

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

      const refresh = await this.utilSvc.generarJWT(payload, '7d');
      const hashRT = await this.utilSvc.hash(refresh);
      await this.authSvc.updateHash(payload.id, hashRT);
      payload.hash = hashRT;
      const jwt = await this.utilSvc.generarJWT(payload, '1h');
      return { access_token: jwt, refresh_token: hashRT };
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Recibe un Refresh Token, valida que no hay expirado y entrga un nuevo Access Token',
  })
  public async refreshToken(@Req() request: any) {
    // TODO: Obtener el usuario en sesión
    const userSession = request['user'];
    const user = await this.authSvc.getUserById(userSession.id);

    if (!user || !user.hash)
      throw new AppException('Acceso denegado', HttpStatus.FORBIDDEN, '0');

    // TODO: Comparar el token recibido con el token guardado
    if (userSession.hash != user.hash)
      throw new AppException('Token inválido', HttpStatus.FORBIDDEN, '0');

    // TODO: Si el Token es valido se generan nuevos tokens
    return {
      token: '',
      refresh_token: '',
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Invalida los tokens en el lado del servidor y limpia las cookies',
  })
  public async logout(@Req() request: any) {
    const session = request['user'];
    const user = await this.authSvc.updateHash(session.id, null);
    return user;
  }
}
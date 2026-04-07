import { Controller, Get, HttpCode, Post, HttpStatus, Body, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
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
      const { password: _, hash: __, ...payload } = user;

      const refresh = await this.utilSvc.generarJWT(payload, '7d');
      const hashRT = await this.utilSvc.hash(refresh);
      await this.authSvc.updateHash(payload.id, hashRT);
      const jwt = await this.utilSvc.generarJWT({ ...payload, hash: hashRT }, '5h');
      return { access_token: jwt, refresh_token: refresh };
    } else {
      throw new Error('El usuario y/o contraseña es incorrecto');
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
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
  @ApiOperation({
    summary:
      'Recibe un Refresh Token, valida que no hay expirado y entrga un nuevo Access Token',
  })
public async refreshToken(@Body() body: { refresh_token: string }) {
  // TODO: Obtener el usuario en sesión
  const { refresh_token } = body;

  if (!refresh_token) {
    throw new Error('No se proporcionó el refresh token');
  }

  try {
    const payload = await this.utilSvc.getPlayload(refresh_token);

    const user = await this.authSvc.getUserById(payload.id);
    

    if (!user || !user.hash) {
      throw new Error('Usuario no encontrado o sin sesión activa');
    }

    const isHashValid = await this.utilSvc.checkPassword(refresh_token, user.hash);
    
    // TODO: Comparar el token recibido con el token guardado
    if (!isHashValid) {
       throw new Error('Token inválido o revocado');
    }

    const { password: _, hash: __, ...userPayload } = user;

    const newRefresh = await this.utilSvc.generarJWT(userPayload, '7d');
    const newHash = await this.utilSvc.hash(newRefresh);
    await this.authSvc.updateHash(user.id, newHash);

    // TODO: Si el Token es valido se generan nuevos tokens
    const newJwt = await this.utilSvc.generarJWT({ ...userPayload, hash: newHash }, '5h');


    return {
      access_token: newJwt,
      refresh_token: newRefresh,
    };

  } catch (error) {
    throw new UnauthorizedException('Sesión expirada, loguéate de nuevo');
  }
}

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Invalida los tokens en el lado del servidor y limpia las cookies',
  })
  public async logout(@Req() request: any) {
    const session = request['user'];
    const user = await this.authSvc.updateHash(session.id, null);
    return user;
  }
}
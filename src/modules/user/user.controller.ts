import {
  Controller, Get, Post, Put, Delete,
  Body, Param, ParseIntPipe, HttpException,
  HttpStatus, HttpCode, Req, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UtilService } from 'src/common/services/util.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('users')
@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userSvc: UserService,
    private readonly utilSvc: UtilService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtiene todos los usuarios' })
  public async getUsers(@Req() request: any): Promise<any[]> {
    const { id } = request['user'];
    console.log('Usuario en sesión:', id);
    return await this.userSvc.getuser(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtiene un usuario por ID' })
  public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const user = await this.userSvc.getUserById(id);
    if (user) return user;
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo usuario' })
  public async insertUser(@Body() user: CreateUserDto): Promise<any> {
    const userByUsername = await this.userSvc.getUserByUsername(user.username);
    if (userByUsername) {
      throw new HttpException('El nombre de usuario ya existe', HttpStatus.CONFLICT);
    }
    if (!user.password) {
      throw new Error('La contraseña es requerida');
    }
    const encryptedPassword = await this.utilSvc.hash(user.password);
    user.password = encryptedPassword;
    return await this.userSvc.insertUser(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un usuario existente' })
  public async updateUser(
    @Param('id', ParseIntPipe) id: number, 
    @Body() user: UpdateUserDto
  ): Promise<any> {
    try {
      if (user.password) {
        user.password = await this.utilSvc.hash(user.password);
      }

      const updatedUser = await this.userSvc.updateUser(id, user);

      if (!updatedUser) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      return updatedUser;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('Error interno:', error);
      throw new HttpException(
        'Ocurrió un error interno en el servidor', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Elimina un usuario por ID' })
  public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    try {
      const tasks = await this.userSvc.getTasksByUser(id);
      if (tasks.length > 0) {
        throw new HttpException('No se puede eliminar el usuario porque tiene tareas asociadas', HttpStatus.CONFLICT);
      }
      await this.userSvc.deleteUser(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
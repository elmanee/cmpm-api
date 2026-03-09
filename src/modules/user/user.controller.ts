import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UtilService } from 'src/common/services/util.service';

@ApiTags('users')
@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userSvc: UserService,
    private readonly utilSvc: UtilService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los usuarios' })
  public async getUsers(): Promise<any[]> {
    return await this.userSvc.getUser();
  }

  @Get(':id')
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
    const encryptedPassword = await this.utilSvc.hashPassword(user.password);
    user.password = encryptedPassword;
    return await this.userSvc.insertUser(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un usuario existente' })
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    return this.userSvc.updateUser(id, user).then((updated) => {
      if (updated) return updated;
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }).catch((error) => {
      console.log(error);
      throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Delete(':id')
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
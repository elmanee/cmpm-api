import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { PrismaService } from 'src/prisma.service';
import { Client } from 'pg';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Client,
    private prisma: PrismaService,
  ) {}

  public async getuser(id: number): Promise<any[]> {
    return await (this.prisma as any).user.findMany({
      orderBy: { id: 'asc' },
      where: {
        id: { not: id },
      },
    });
  }

  public async getUserById(id: number): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async getUserByUsername(username: string): Promise<any> {
    return await (this.prisma as any).user.findFirst({
      where: { username },
    });
  }

  public async getTasksByUser(id: number): Promise<any[]> {
    return await this.prisma.task.findMany({
      where: { user_id: id },
    });
  }

  public async insertUser(user: CreateUserDto): Promise<any> {
    const newUser = await this.prisma.user.create({
      data: user as any,
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        password: false,
        hash: false,
      },
    });
    return newUser;
  }

  public async updateUser(id: number, userUpdated: UpdateUserDto): Promise<any> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: userUpdated,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async deleteUser(id: number): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
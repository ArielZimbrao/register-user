import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/entities/user.entity';
import { InvalidID } from '../exception';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  authentication(@Body() authDto: AuthDto) {
    return this.userService.authentication(authDto.token);
  }

  @Get()
  getList(): Promise<User[]> {
    return this.userService.getList();
  }

  @Get(':id')
  getOne(@Param('id') id: Number): Promise<User> {
    if (id) {
      return this.userService.getOne(id);
    } else {
      throw new InvalidID()
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: Number) {
    if (id) {
      return this.userService.deleteUser(id);
    } else {
      throw new InvalidID()
    }
  }

  @Post()
  createUser(@Body() user: CreateUser): Promise<User>  {
    return this.userService.createUser(user);
  }

  @Put()
  updateUser(@Body() user: UpdateUser) {
    return this.userService.updateUser(user);
  }
}

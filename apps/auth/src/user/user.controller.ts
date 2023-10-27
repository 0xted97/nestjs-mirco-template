import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('auth.login')
  async login(@Payload() body: LoginDto) {
    console.log("🚀 ~ file: user.controller.ts:13 ~ UserController ~ login ~ body:", body)
    return body;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

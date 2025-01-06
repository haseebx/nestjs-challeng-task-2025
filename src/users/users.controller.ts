import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectQueue('welcome') private readonly welcomeQueue: Queue,
  ) {}

  // Endpoint to create a new user
  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Save user details' })
  @ApiOkResponse({ type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    await this.welcomeQueue.add('sendWelcomeMessage', { email: user.email });
    return user;
  }

  // Endpoint to get all users
  @Get('all')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user details' })
  @ApiOkResponse({ type: UserResponseDto })
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  // Endpoint to get all users above 18
  @Get('above-18')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user details above 18 age' })
  @ApiOkResponse({ type: UserResponseDto })
  findAllBelowEigtheen(): Promise<UserResponseDto[]> {
    return this.usersService.aboveAge();
  }

  // Endpoint to get user by userId
  @Get(':userId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user details' })
  @ApiOkResponse({ type: UserResponseDto })
  findOne(@Param('userId') userId: string): Promise<UserResponseDto> {
    return this.usersService.findOne(userId);
  }

  // Endpoint to update user details by userId
  @Patch(':userId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update user details' })
  @ApiOkResponse({ type: UserResponseDto })
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(userId, updateUserDto);
  }

  // Endpoint to delete user by userId
  @Delete(':userId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete user details' })
  @ApiOkResponse({ type: UserResponseDto })
  remove(@Param('userId') userId: string): Promise<{ msg: string }> {
    return this.usersService.remove(userId);
  }
}

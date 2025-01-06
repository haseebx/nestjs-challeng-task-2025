import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, MoreThan, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const { name, email, age } = createUserDto;
      const user = new Users();
      user.name = name;
      user.email = email;
      user.age = age;
      const newUser = await this.usersRepository.save(user);
      return new UserResponseDto(newUser);
    } catch (error) {
      console.error('Failed to get database configuration', error);
      throw new HttpException(
        'Failed to save user details in DB',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    try {
      const users = await this.usersRepository.find({
        where: {
          deletedAt: IsNull(),
        },
      });

      return users;
    } catch (error) {
      console.error('Failed to get database configuration', error);
      throw new HttpException(
        'Failed to fetch the all users from DB',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async aboveAge(): Promise<UserResponseDto[]> {
    try {
      const users = await this.usersRepository.find({
        where: {
          deletedAt: IsNull(), // Ensures the user is not deleted
          age: MoreThan(18), // Filters users older than 18
        },
        order: {
          name: 'ASC', // Sorts users by name in ascending order
        },
      });

      return users;
    } catch (error) {
      console.error('Failed to retrieve users', error);
      throw new HttpException(
        'Failed to retrieve users above 18 years of age',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(userId: string): Promise<UserResponseDto> {
    try {
      const users = await this.usersRepository.findOne({
        where: {
          userId,
          deletedAt: IsNull(),
        },
      });

      return users;
    } catch (error) {
      console.error('Failed to get database configuration', error);
      throw new HttpException(
        'Failed to fetch user by userID',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      const user = await this.usersRepository.findOne({
        where: { userId, deletedAt: IsNull() },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      updateUserDto.updatedAt = new Date();
      await this.usersRepository.update(userId, updateUserDto);
      const updatedUser = await this.usersRepository.findOne({
        where: { userId },
      });
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return new UserResponseDto(updatedUser);
    } catch (error) {
      console.error('Failed to get database configuration', error);
      throw new HttpException(
        'Failed to update the user by UserId',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(userId: string): Promise<{ msg: string }> {
    try {
      const user = await this.usersRepository.findOne({
        where: { userId, deletedAt: IsNull() },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user.deletedAt = new Date();
      await this.usersRepository.save(user);
      return { msg: 'User deleted successfully' };
    } catch (err) {
      throw new HttpException(
        'Failed to delete user by userId',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

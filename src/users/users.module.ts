import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { BullModule } from '@nestjs/bull';
import { WelcomeProcessor } from './processors/welcome.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    BullModule.registerQueue({
      name: 'welcome',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, WelcomeProcessor],
})
export class UsersModule {}

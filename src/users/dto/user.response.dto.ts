import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ uniqueItems: true })
  email: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  createdAt: Date;

  constructor(user: UserResponseDto) {
    this.userId = user.userId;
    this.name = user.name;
    this.email = user.email;
    this.age = user.age;
    this.createdAt = user.createdAt;
  }
}

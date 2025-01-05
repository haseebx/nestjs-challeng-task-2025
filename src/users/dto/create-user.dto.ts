import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Min, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty({ uniqueItems: true })
  @ValidateIf((o) => o.email)
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  readonly age: number;
}

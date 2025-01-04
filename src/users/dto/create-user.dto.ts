import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, ValidateIf } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty({ uniqueItems: true })
    @ValidateIf(o => o.email )
    @IsEmail({}, { message: 'Invalid email format' })
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly age: number;
}

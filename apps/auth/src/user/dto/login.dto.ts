import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail } from "class-validator";

export class LoginDto {
    @ApiProperty({ required: true })
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty({ required: true })
    @IsDefined()
    password: string;
}

import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username : string;

    @IsString()
    @MinLength(6, {message: "Password Too Weak"})
    @MaxLength(12)
    password : string;
}
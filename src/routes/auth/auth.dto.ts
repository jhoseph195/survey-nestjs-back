import { ApiProperty } from "@nestjs/swagger";
import { IsEmailTidy } from "@nestjsi/class-validator";
import { IsOptional, IsEnum, IsString, MinLength } from "class-validator";


export enum EOrigin {
    APP = 'APP',
    WEB = 'WEB',
}

export class PostLoginDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsEmailTidy()
    email: string;

    @ApiProperty({ required: true, minLength: 8 })
    @IsString()
    @MinLength(8)
    password: string;
    
    @ApiProperty({ required: false, enum: EOrigin })
    @IsEnum(EOrigin)
    @IsOptional()
    origin: EOrigin;
}

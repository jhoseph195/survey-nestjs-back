import { ApiProperty } from "@nestjs/swagger";
import { IsEmailTidy } from "@nestjsi/class-validator";
import { IsOptional, IsNumber, IsString, MaxLength, MinLength } from "class-validator";


export enum EOrigin {
    APP = 'APP',
    WEB = 'WEB',
}

export class GetCompanysDto {
    @ApiProperty({
      required: false,
    })
    @IsString()
    @IsOptional()
    filter?: string;
  
    @ApiProperty({
      required: false,
    })
    @IsNumber()
    @IsOptional()
    limit?: number;
  
    @ApiProperty({
      required: false,
    })
    @IsNumber()
    @IsOptional()
    page?: number;
}

export class PostCompanysDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  socialReason: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  business: string;

  @ApiProperty({
    required: true,
  })
  @IsEmailTidy()
  email: string;
  
  @ApiProperty({
    required: true,
  })
  @IsString()
  phone: string;
  
  @ApiProperty({
    required: true,
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  neighborhood: string;
  
  @ApiProperty({
    required: true,
    maxLength: 5,
    minLength: 5,
  })
  @IsNumber()
  @MinLength(5)
  @MaxLength(5)
  postalCode: string;
}

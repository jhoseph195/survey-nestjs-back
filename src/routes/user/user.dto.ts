import { ApiProperty } from "@nestjs/swagger";
import { IsEmailTidy } from "@nestjsi/class-validator";
import { IsOptional, IsNumber, IsString, IsEnum, MinLength } from "class-validator";
import { EType } from "../../entities/user.entity";

export class GetUsersDto {
    @ApiProperty({
      required: false,
    })
    @IsNumber()
    @IsOptional()
    companyId?: number;
    
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

export class PostUsersDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsEmailTidy()
  email: string;
  
  @ApiProperty({
    required: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  password?: string;

  @ApiProperty({
      required: false,
      enum: EType,
  })
  @IsEnum(EType)
  type: EType;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  companyId: number;
}

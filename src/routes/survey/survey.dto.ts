import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsString, IsArray } from "class-validator";


export class GetSurveysDto {
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

export class PostSurveysDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Object,
    isArray: true
  })
  @IsArray()
  format: Array<any>;
  
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  companyId: number;
}

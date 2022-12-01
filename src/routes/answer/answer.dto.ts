import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsString, IsArray } from "class-validator";


export class GetAnswerDto {
    @ApiProperty({
      required: false,
    })
    @IsNumber()
    @IsOptional()
    surveyId?: number;

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

export class PostAnswerDto {
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
  surveyId: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  userId: number;
}

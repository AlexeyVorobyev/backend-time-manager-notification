import {BaseHttpExceptionDto} from "../../common/dto/BaseHttpException.dto";
import {IsNotEmpty, IsNumber, IsOptional} from "class-validator";

export class AuthAxiosDto {
    @IsNotEmpty()
    @IsNumber()
    status: number

    @IsOptional()
    data: BaseHttpExceptionDto
}
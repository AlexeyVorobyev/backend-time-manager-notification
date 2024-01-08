import {Controller, Get, HttpCode, HttpStatus} from "@nestjs/common";
import {ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {NotificationService} from "./notification.service";
import {BaseHttpExceptionDto} from "../common/dto/BaseHttpException.dto";
@ApiTags('notification')
@Controller('notification')
export class NotificationController {
    constructor(private readonly NotificationService: NotificationService) {
    }

    @ApiUnauthorizedResponse({
        description: 'Provided accessToken are invalid or expired or accessToken not provided',
        type: BaseHttpExceptionDto
    })
    @ApiOkResponse({
        description: 'User successfully authenticated'
    })
    @HttpCode(HttpStatus.OK)
    @Get('test')
    @ApiBearerAuth()
    async test(): Promise<void> {

    }
}
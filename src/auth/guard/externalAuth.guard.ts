import {CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AuthService} from "../auth.service";
import {Request} from "express";
import {BaseHttpExceptionDto} from "../../common/dto/BaseHttpException.dto";

@Injectable()
export class ExternalAuthGuard implements CanActivate {
    constructor(
        private readonly AuthService: AuthService,
        private reflector: Reflector
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass()
        ])
        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const token = this.getToken(request)
        //Логика аутентификации с помощью внешнего микросервиса
        const response = await this.AuthService.auth(token)

        if (response.status !== HttpStatus.OK) {
            throw new UnauthorizedException(response.data.message)
        }

        return true
    }

    private getToken(request: Request) {
        const [_, token] = request.headers.authorization?.split(' ') ?? []
        return token
    }
}
import {Inject, Injectable} from "@nestjs/common";
import {BaseHttpExceptionDto} from "../common/dto/BaseHttpException.dto";
import axios, {AxiosResponse} from "axios";
import externalApisConfig from "../common/config/externalApis.config";
import {ConfigType} from "@nestjs/config";
import {AuthAxiosDto} from "./dto/authAxios.dto";
import {Builder} from "builder-pattern";

@Injectable()
export class AuthService {
    constructor(
        @Inject(externalApisConfig.KEY)
        private readonly externalApisConfiguration: ConfigType<typeof externalApisConfig>
    ) {
    }

    async auth(accessToken: string): Promise<AuthAxiosDto> {
        const AuthAxiosDtoBuilder = Builder(AuthAxiosDto)
        return await axios.post(this.externalApisConfiguration.authApi + 'auth/internal-auth', undefined, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                AuthAxiosDtoBuilder
                    .status(response.status)
                    .data(response.data)
                return AuthAxiosDtoBuilder.build()
            })
            .catch((error) => {
                AuthAxiosDtoBuilder
                    .status(error.response.status)
                    .data(error.response.data)
                return AuthAxiosDtoBuilder.build()
            })
    }
}
import { registerAs } from '@nestjs/config'

export default registerAs('externalApis', () => {
    return {
        authApi: process.env.AUTH_API,
    }
})
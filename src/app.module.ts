import {Module} from '@nestjs/common'
import {DatabaseModule} from './database/database.module'
import {ConfigModule} from '@nestjs/config'
import swaggerConfig from './common/config/swagger.config'
import databaseConfig from './common/config/database.config'
import appConfig from './common/config/app.config'
import {validate} from './common/validation/env.validation'
import {NotificationModule} from "./notification/notification.module";
import {APP_GUARD} from "@nestjs/core";
import {ExternalAuthGuard} from "./auth/guard/externalAuth.guard";
import {AuthModule} from "./auth/auth.module";
import externalApisConfig from "./common/config/externalApis.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig, swaggerConfig, externalApisConfig],
            validate
        }),
        DatabaseModule,
        AuthModule,
        NotificationModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ExternalAuthGuard
        }
    ]
})
export class AppModule {
}

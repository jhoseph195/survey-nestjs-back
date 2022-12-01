"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./routes/auth/auth.module");
const survey_module_1 = require("./routes/survey/survey.module");
const answer_module_1 = require("./routes/answer/answer.module");
const company_module_1 = require("./routes/company/company.module");
const user_module_1 = require("./routes/user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const config_1 = require("@nestjs/config");
const nestjs_session_1 = require("nestjs-session");
const core_1 = require("@nestjs/core");
const session_validator_guard_1 = require("./guards/session-validator/session-validator.guard");
const company_entity_1 = require("./entities/company.entity");
const survey_entity_1 = require("./entities/survey.entity");
const answer_entity_1 = require("./entities/answer.entity");
const session_entity_1 = require("./entities/session.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASS,
                database: process.env.MYSQL_DATABASE,
                entities: [
                    user_entity_1.User,
                    company_entity_1.Company,
                    survey_entity_1.Survey,
                    answer_entity_1.Answer,
                    session_entity_1.Session,
                ],
                synchronize: true,
            }),
            nestjs_session_1.SessionModule.forRoot({
                session: {
                    secret: process.env.SESSION_SECRET,
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        maxAge: 24 * 60 * 60 * 1000
                    }
                }
            }),
            auth_module_1.AuthModule,
            survey_module_1.SurveyModule,
            answer_module_1.AnswerModule,
            company_module_1.CompanyModule,
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([session_entity_1.Session]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: session_validator_guard_1.SessionValidatorGuard
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
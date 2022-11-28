import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';
import { SurveyModule } from './routes/survey/survey.module';
import { AnswerModule } from './routes/answer/answer.module';
import { CompanyModule } from './routes/company/company.module';
import { UserModule } from './routes/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from 'nestjs-session';
import { APP_GUARD } from '@nestjs/core';
import { SessionValidatorGuard } from './guards/session-validator/session-validator.guard';
import { Company } from './entities/company.entity';
import { Survey } from './entities/survey.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DATABASE,
      entities: [
        User,
        Company,
        Survey,
      ],
      synchronize: true,
    }),
    SessionModule.forRoot({
      session: {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 24 * 60 * 60 * 1000
        }
      }
    }),
    AuthModule,
    SurveyModule,
    AnswerModule,
    CompanyModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: SessionValidatorGuard
    },
  ],
})
export class AppModule {}

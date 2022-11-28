import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/guards.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  @Public()
  getHealthCheck() {
    return this.appService.getHealthCheck();
  }
}

import { Injectable } from '@nestjs/common';
import * as os from 'os';
import * as paramsJson from '../package.json';

@Injectable()
export class AppService {
  getHealthCheck() {
    return {
      message: 'Health check OK',
      data: {
        hostname: os.hostname(),
        version: paramsJson.version,
      }
    };
  }
}

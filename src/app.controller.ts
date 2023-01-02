import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('test')
  test() {
    return {
      test: 1,
    };
  }
}

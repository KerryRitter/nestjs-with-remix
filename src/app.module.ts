import { AppService } from './app.service';
import path from 'path';
import { AppController } from './app.controller';
import { RemixModule } from './remix/remix-app-module';

@RemixModule(
  {
    controllers: [AppController],
    providers: [AppService],
  },
  {
    publicDir: path.join(process.cwd(), 'public'),
    browserBuildDir: path.join(process.cwd(), 'build/'),
  },
)
// eslint-disable-next-line prettier/prettier
export class AppModule { }

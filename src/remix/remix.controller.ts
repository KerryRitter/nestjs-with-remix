import { All, Controller, Next, Req, Res } from '@nestjs/common';
import type { GetLoadContextFunction } from '@remix-run/express';
import { createRequestHandler } from '@remix-run/express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { RemixConfig } from './types';
import { InjectRemixConfig } from './types';

@Controller('/')
export class RemixController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
  constructor(@InjectRemixConfig() private readonly remixConfig: RemixConfig) { }

  @All('*')
  handler(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    if (this.isStaticAsset(request)) {
      return next();
    }

    this.purgeRequireCacheInDev();

    const getLoadContext: GetLoadContextFunction = (req) => {
      return {};
    };

    return createRequestHandler({
      build: require(this.remixConfig.browserBuildDir),
      getLoadContext,
    })(request, response, next);
  }

  private purgeRequireCacheInDev() {
    if (process.env.NODE_ENV === 'production') return;

    for (const key in require.cache) {
      if (key.startsWith(this.remixConfig.browserBuildDir)) {
        delete require.cache[key];
      }
    }
  }

  private isStaticAsset(request: Request) {
    return /^\/(build|assets)\//gi.test(request.url);
  }
}

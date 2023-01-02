import type { ModuleMetadata } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RemixController } from './remix.controller';
import type { RemixConfig } from './types';
import { REMIX_CONFIG } from './types';

export const RemixModule = (
  metadata: ModuleMetadata,
  remixConfig: RemixConfig,
) => {
  if (!metadata.imports) {
    metadata.imports = [];
  }

  metadata.imports.push(
    ServeStaticModule.forRoot({
      rootPath: remixConfig.publicDir,
      serveRoot: '/',
      serveStaticOptions: {
        setHeaders(res, pathname) {
          const relativePath = pathname.replace(remixConfig.publicDir, '');
          res.setHeader(
            'Cache-Control',
            relativePath.startsWith(remixConfig.browserBuildDir)
              ? 'public, max-age=31536000, immutable' // Remix fingerprints its assets so we can cache forever
              : 'public, max-age=3600', // You may want to be more aggressive with this caching
          );
        },
      },
    }),
  );

  if (!metadata.controllers) {
    metadata.controllers = [];
  }
  metadata.controllers.push(RemixController);

  if (!metadata.providers) {
    metadata.providers = [];
  }
  metadata.providers.push({
    provide: REMIX_CONFIG,
    useValue: remixConfig,
  });

  return Module(metadata);
};

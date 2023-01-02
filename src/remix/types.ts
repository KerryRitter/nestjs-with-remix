import { Inject } from '@nestjs/common';

export const REMIX_CONFIG = 'REMIX_CONFIG';
export const InjectRemixConfig = () => Inject(REMIX_CONFIG);
export type RemixConfig = { publicDir: string; browserBuildDir: string };

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { RemixController } from './remix.controller';

describe('RemixController', () => {
  let controller: RemixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemixController],
    }).compile();

    controller = module.get<RemixController>(RemixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

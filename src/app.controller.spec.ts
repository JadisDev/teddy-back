import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('deve estar definido', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('deve retornar { ping: "pong" }', () => {
      expect(appController.getHello()).toEqual({ ping: 'pong' });
    });
  });
});

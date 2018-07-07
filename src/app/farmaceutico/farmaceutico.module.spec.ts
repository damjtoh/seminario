import { FarmaceuticoModule } from './farmaceutico.module';

describe('FarmaceuticoModule', () => {
  let farmaceuticoModule: FarmaceuticoModule;

  beforeEach(() => {
    farmaceuticoModule = new FarmaceuticoModule();
  });

  it('should create an instance', () => {
    expect(farmaceuticoModule).toBeTruthy();
  });
});

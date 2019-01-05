import { HlsjsPlyrDriver } from './hlsjs-plyr-driver';

describe('HlsjsPlyrDriver', () => {
  it('should be created', () => {
    const driver = new HlsjsPlyrDriver(true);
    expect(driver).toBeTruthy();
  });
});

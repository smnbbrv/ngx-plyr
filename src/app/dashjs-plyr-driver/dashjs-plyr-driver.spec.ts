import { TestBed } from '@angular/core/testing';
import { DashjsPlyrDriver } from './dashjs-plyr-driver';

describe('DashjsPlyrDriver', () => {
  it('should be created', () => {
    const driver = new DashjsPlyrDriver(true);
    expect(driver).toBeTruthy();
  });
});

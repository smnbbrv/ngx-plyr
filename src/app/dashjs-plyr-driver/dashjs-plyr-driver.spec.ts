import { TestBed } from '@angular/core/testing';
import { DashjsPlyrDriver } from './dashjs-plyr-driver';

describe('DashjsPlyrDriver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashjsPlyrDriver = TestBed.get(DashjsPlyrDriver);
    expect(service).toBeTruthy();
  });
});

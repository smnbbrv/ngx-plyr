import { TestBed } from '@angular/core/testing';
import { HlsjsPlyrDriver } from './hlsjs-plyr-driver';

describe('HlsjsPlyrDriver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HlsjsPlyrDriver = TestBed.get(HlsjsPlyrDriver);
    expect(service).toBeTruthy();
  });
});

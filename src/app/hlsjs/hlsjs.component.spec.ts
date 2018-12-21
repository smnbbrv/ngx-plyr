import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlsjsComponent } from './hlsjs.component';

describe('HlsjsComponent', () => {
  let component: HlsjsComponent;
  let fixture: ComponentFixture<HlsjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlsjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlsjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

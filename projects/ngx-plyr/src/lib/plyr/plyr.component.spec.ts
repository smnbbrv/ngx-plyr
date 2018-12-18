import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlyrComponent } from './plyr.component';

describe('PlyrComponent', () => {
  let component: PlyrComponent;
  let fixture: ComponentFixture<PlyrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlyrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlyrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

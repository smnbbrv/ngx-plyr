import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../testing.module';
import { DashjsComponent } from './dashjs.component';

describe('DashjsComponent', () => {
  let component: DashjsComponent;
  let fixture: ComponentFixture<DashjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [DashjsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

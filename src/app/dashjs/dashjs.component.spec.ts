import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlyrModule } from '../../../projects/ngx-plyr/src/public_api';
import { DashjsComponent } from './dashjs.component';

describe('DashjsComponent', () => {
  let component: DashjsComponent;
  let fixture: ComponentFixture<DashjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PlyrModule,
      ],
      declarations: [ DashjsComponent ]
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

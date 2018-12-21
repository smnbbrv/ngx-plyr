import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlyrModule } from '../../../projects/ngx-plyr/src/public_api';
import { HlsjsComponent } from './hlsjs.component';

describe('HlsjsComponent', () => {
  let component: HlsjsComponent;
  let fixture: ComponentFixture<HlsjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PlyrModule,
      ],
      declarations: [HlsjsComponent]
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

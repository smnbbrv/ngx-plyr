import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DashjsComponent } from './dashjs/dashjs.component';
import { HlsjsComponent } from './hlsjs/hlsjs.component';
import { TestingModule } from './testing.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [
        AppComponent,
        DashjsComponent,
        HlsjsComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

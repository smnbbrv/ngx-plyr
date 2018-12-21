import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PlyrModule } from '../../projects/ngx-plyr/src/public_api';
import { DashjsComponent } from './dashjs/dashjs.component';
import { HlsjsComponent } from './hlsjs/hlsjs.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PlyrModule,
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

  it(`should have as title 'ngx-plyr example'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ngx-plyr example');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ngx-plyr example');
  });
});

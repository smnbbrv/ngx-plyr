import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlyrModule } from '../../projects/ngx-plyr/src/public_api';
import { AppComponent } from './app.component';
import { DashjsComponent } from './dashjs/dashjs.component';
import { HlsjsComponent } from './hlsjs/hlsjs.component';

@NgModule({
  declarations: [
    AppComponent,
    DashjsComponent,
    HlsjsComponent
  ],
  imports: [
    BrowserModule,
    PlyrModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

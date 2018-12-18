import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlyrModule } from '../../projects/ngx-plyr/src/public_api';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlyrModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

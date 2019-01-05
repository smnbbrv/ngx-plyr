import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule, MatDividerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlyrModule } from '../../projects/ngx-plyr/src/public_api';
import { AppComponent } from './app.component';
import { DashjsComponent } from './dashjs/dashjs.component';
import { HlsjsComponent } from './hlsjs/hlsjs.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    DashjsComponent,
    HlsjsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,

    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,

    PlyrModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

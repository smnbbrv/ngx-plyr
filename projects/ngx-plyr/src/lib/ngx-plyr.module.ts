import { NgModule } from '@angular/core';
import { PlyrComponent } from './plyr/plyr.component';

@NgModule({
  declarations: [
    PlyrComponent,
  ],
  exports: [
    PlyrComponent,
  ]
})
export class PlyrModule { }

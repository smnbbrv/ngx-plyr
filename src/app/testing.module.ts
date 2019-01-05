import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PlyrModule } from '../../projects/ngx-plyr/src/public_api';

const imports = [
  NoopAnimationsModule,
  FlexLayoutModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatToolbarModule,
  PlyrModule,
];

@NgModule({
  imports,
  exports: imports
})
export class TestingModule { }

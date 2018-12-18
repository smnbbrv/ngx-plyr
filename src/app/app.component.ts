import { Component, ViewChild } from '@angular/core';
import Plyr from 'plyr';
import { PlyrComponent } from '../../projects/ngx-plyr/src/lib/plyr/plyr.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  title = 'ngx-plyr example';

  videoSources: Plyr.Source[] = [
    {
      src: 'bTqVqk7FSmY',
      provider: 'youtube',
    },
  ];

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }

  play(): void {
    this.plyr.player.play();
  }

}

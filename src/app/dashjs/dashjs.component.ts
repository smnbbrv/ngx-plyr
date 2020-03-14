import { Component, OnInit } from '@angular/core';
import * as Plyr from 'plyr';
import { DashjsPlyrDriver } from '../dashjs-plyr-driver/dashjs-plyr-driver';

@Component({
  selector: 'app-dashjs',
  templateUrl: './dashjs.component.html',
  styleUrls: ['./dashjs.component.scss']
})
export class DashjsComponent implements OnInit {

  options: Plyr.Options = {
    captions: { active: true, update: true, language: 'en' },
  };

  poster = 'https://bitdash-a.akamaihd.net/content/sintel/poster.png';

  sources: Plyr.Source[] = [{
    type: 'video',
    src: 'https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd',
  }];

  dashjsDriver1 = new DashjsPlyrDriver(true);

  dashjsDriver2 = new DashjsPlyrDriver(false);

  constructor() { }

  ngOnInit() {
  }

  played() {
    this.dashjsDriver2.load('https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd');
  }

}

import { Component, OnInit } from '@angular/core';
import * as Plyr from 'plyr';
import { HlsjsPlyrDriver } from '../hlsjs-plyr-driver/hlsjs-plyr-driver';

@Component({
  selector: 'app-hlsjs',
  templateUrl: './hlsjs.component.html',
  styleUrls: ['./hlsjs.component.scss'],
})
export class HlsjsComponent implements OnInit {

  plyr1: Plyr;
  plyr2: Plyr;

  options: Plyr.Options = {
    captions: { active: true, update: true, language: 'en' },
  };

  poster = 'https://bitdash-a.akamaihd.net/content/sintel/poster.png';

  sources: Plyr.Source[] = [{
    type: 'video',
    src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  }];

  hlsjsDriver1 = new HlsjsPlyrDriver(true);

  hlsjsDriver2 = new HlsjsPlyrDriver(false);

  constructor() { }

  ngOnInit() {
  }

  languageChanged(driver: HlsjsPlyrDriver, plyr: Plyr) {
    setTimeout(() => driver.hls.subtitleTrack = plyr.currentTrack, 50);
  }

  played() {
    this.hlsjsDriver2.load(this.sources[0].src);
  }

}

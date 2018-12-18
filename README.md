# ngx-plyr

Angular 6+ bindings for [plyr video and audio player](https://github.com/sampotts/plyr).

[![Build Status](https://img.shields.io/travis/smnbbrv/ngx-plyr/master.svg)](https://travis-ci.org/smnbbrv/ngx-plyr)
[![Coverage Status](https://img.shields.io/coveralls/github/smnbbrv/ngx-plyr/master.svg)](https://coveralls.io/github/smnbbrv/ngx-plyr?branch=master)

## Installation

```sh
npm i plyr ngx-plyr
```

## Usage

Add `"node_modules/plyr/dist/plyr.css"` to the `styles` section of your `angular.json`:

```json
"styles": [
  "src/styles.scss",
  "node_modules/plyr/dist/plyr.css"
],
```

Import `PlyrModule` into the current module's imports:

```ts
import { PlyrModule } from 'ngx-plyr';

imports: [
  // ...
  PlyrModule,
],
```

Finally use `plyr` in your components as attribute:

```html
<div plyr style="width: 640px;" plyrTitle="Video 1" [plyrSources]="videoSources" (plyrInit)="player = $event" (plyrPlay)="played($event)"></div>

<button (click)="play()">Play</button>
```

or tag (remember that in this case `plyr` tag has `dipslay: inline` which cannot accept width, so you need to care of this):

```html
<plyr style="display: block; width: 640px;" plyrTitle="Video 1" [plyrSources]="videoSources" (plyrInit)="player = $event" (plyrPlay)="played($event)"></plyr>

<button (click)="play()">Play</button>
```

and the component file would have

```ts
// get the component instance to have access to plyr instance
@ViewChild(PlyrComponent)
plyr: PlyrComponent;

// or get it from plyrInit event
player: Plyr;

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
  this.player.play(); // or this.plyr.player.play()
}
```

## API

The API mostly replicates the original Plyr API. See https://github.com/sampotts/plyr for more info

### Inputs

* **plyrType**: video or audio, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrTitle**: string, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrPoster**: poster URL, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrSources**: array of sources, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrTracks**: array of tracks, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrOptions**: [initial Plyr options](https://github.com/sampotts/plyr#options)

> **Important**: changing `plyrOptions` will trigger the `Plyr` reinitialization, since these options cannot be changed on-the-fly (limitation of Plyr itself)

### Events

ngx-plyr events:

* **plyrInit**: emits a plyr instance when it gets created

[plyr events:](https://github.com/sampotts/plyr#events)

* **plyrProgress**: replicates original *progress* event
* **plyrPlaying**: replicates original *playing* event
* **plyrPlay**: replicates original *play* event
* **plyrPause**: replicates original *pause* event
* **plyrTimeUpdate**: replicates original *timeupdate* event
* **plyrVolumeChange**: replicates original *volumechange* event
* **plyrSeeking**: replicates original *seeking* event
* **plyrSeeked**: replicates original *seeked* event
* **plyrRateChange**: replicates original *ratechange* event
* **plyrEnded**: replicates original *ended* event
* **plyrEnterFullScreen**: replicates original *enterfullscreen* event
* **plyrExitFullScreen**: replicates original *exitfullscreen* event
* **plyrCaptionsEnabled**: replicates original *captionsenabled* event
* **plyrCaptionsDisabled**: replicates original *captionsdisabled* event
* **plyrLanguageChange**: replicates original *languagechange* event
* **plyrControlsHidden**: replicates original *controlshidden* event
* **plyrControlsShown**: replicates original *controlsshown* event
* **plyrReady**: replicates original *ready* event

* **plyrLoadStart**: replicates original *loadstart* event
* **plyrLoadedData**: replicates original *loadeddata* event
* **plyrLoadedMetadata**: replicates original *loadedmetadata* event
* **plyrQualityChange**: replicates original *qualitychange* event
* **plyrCanPlay**: replicates original *canplay* event
* **plyrCanPlayThrough**: replicates original *canplaythrough* event
* **plyrStalled**: replicates original *stalled* event
* **plyrWaiting**: replicates original *waiting* event
* **plyrEmptied**: replicates original *emptied* event
* **plyrCueChange**: replicates original *cuechange* event
* **plyrError**: replicates original *error* event

* **plyrStateChange: replicates original *statechange* event

## Getters and setters / Methods

You can use standard [getters and setters](https://github.com/sampotts/plyr#getters-and-setters) and [methods](https://github.com/sampotts/plyr#methods) by getting `Plyr` instance from `plyrInit`.

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

MIT

# ngx-plyr

Angular 6+ bindings for [plyr video and audio player](https://github.com/sampotts/plyr). Supports everything that original library supports.

![Workflow status](https://img.shields.io/github/workflow/status/smnbbrv/ngx-plyr/Push)
[![Coverage Status](https://img.shields.io/coveralls/github/smnbbrv/ngx-plyr/master.svg)](https://coveralls.io/github/smnbbrv/ngx-plyr?branch=master)
![@ngx-grpc/protoc-gen-ng npm version](https://img.shields.io/npm/v/ngx-plyr)

## Installation

```sh
npm i plyr ngx-plyr
```

## TypeScript typings

As long as original plyr does not have yet (sigh) typings, this project has its own at typings/plyr/index.d.ts.

If you have typings issues please refer to the issue #7 for more info.

## Demo

[Demo page](https://smnbbrv.github.io/ngx-plyr/)

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
<div plyr style="width: 640px;" plyrTitle="Video 1" [plyrPlaysInline]="true" [plyrSources]="videoSources" (plyrInit)="player = $event" (plyrPlay)="played($event)"></div>

<button (click)="play()">Play</button>
```

or tag (remember that in this case `plyr` tag has `dipslay: inline` which cannot accept width, so you need to care of this):

```html
<plyr style="display: block; width: 640px;" plyrTitle="Video 1" [plyrPlaysInline]="true" [plyrSources]="videoSources" (plyrInit)="player = $event" (plyrPlay)="played($event)"></plyr>

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

For using with hls.js and dash.js check the examples and implementation of this project's `src/app` folder.

## API

The API mostly replicates the original Plyr API. See <https://github.com/sampotts/plyr> for more info

### Inputs

* **plyrType**: `video` or `audio`, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrTitle**: string, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrPoster**: poster URL, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrSources**: array of sources, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrTracks**: array of tracks, see [source setters](https://github.com/sampotts/plyr#the-source-setter)
* **plyrOptions**: [initial Plyr options](https://github.com/sampotts/plyr#options)
* **plyrPlaysInline**: whether underlying element has `playsinline` attribute, boolean
* **plyrCrossOrigin**: [whether underlying element has `crossorigin` attribute, boolean
* **plyrDriver**: see [custom plyr driver](#custom-plyr-driver)

> **Important**: changing `plyrOptions`, `plyrPlaysInline` and `plyrCrossOrigin` will trigger the `Plyr` reinitialization, since these options cannot be changed on-the-fly

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

* **plyrStateChange**: replicates original *statechange* event

## Getters and setters / Methods

You can use standard [getters and setters](https://github.com/sampotts/plyr#getters-and-setters) and [methods](https://github.com/sampotts/plyr#methods) by getting `Plyr` instance from `plyrInit`.

## Custom Plyr driver

The library allows you to go in its heart by defining a custom Plyr driver. What it means: the hardest stuff is still done for you, but you can apply some actions in the critical points like creating the Plyr instance, updating and destroying it.

This is the right place for integration with other libraries like hls.js, dash.js etc.

The default implementation looks like this:

```ts
import Plyr from 'plyr';
import { PlyrDriver, PlyrDriverCreateParams, PlyrDriverUpdateSourceParams, PlyrDriverDestroyParams } from './plyr-driver';

export class DefaultPlyrDriver implements PlyrDriver {

  create(params: PlyrDriverCreateParams) {
    return new Plyr(params.videoElement, params.options);
  }

  updateSource(params: PlyrDriverUpdateSourceParams) {
    params.plyr.source = params.source;
  }

  destroy(params: PlyrDriverDestroyParams) {
    params.plyr.destroy();
  }

}
```

You can create your own driver and pass it as input parameter to the `plyr` component.

## Integrations

To integrate the library with hls.js and dash.js see the corresponding [demo source code](https://github.com/smnbbrv/ngx-plyr/tree/master/src/app). To integrate others, use same approach with a custom Plyr driver.

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

MIT

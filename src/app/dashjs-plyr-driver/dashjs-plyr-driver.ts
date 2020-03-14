import 'dashjs/dist/dash.all.min.js';
import { PlyrDriver, PlyrDriverCreateParams, PlyrDriverDestroyParams, PlyrDriverUpdateSourceParams } from 'ngx-plyr';
import * as Plyr from 'plyr';

declare const dashjs: any;

export class DashjsPlyrDriver implements PlyrDriver {

  dash = dashjs.MediaPlayer().create();

  private videoElement: HTMLVideoElement;

  private loaded = false;

  constructor(private autoload: boolean) {
    this.dash.getDebug().setLogToBrowserConsole(false);
  }

  create(params: PlyrDriverCreateParams) {
    this.videoElement = params.videoElement;

    return new Plyr(params.videoElement, params.options);
  }

  updateSource(params: PlyrDriverUpdateSourceParams) {
    if (this.autoload) {
      this.load(params.source.sources[0].src);
    } else {
      // poster does not work with autoload
      params.videoElement.poster = params.source.poster;
    }
  }

  destroy(params: PlyrDriverDestroyParams) {
    params.plyr.destroy();
  }

  load(src: string) {
    if (!this.loaded) {
      this.loaded = true;
      this.dash.initialize(this.videoElement, src, false);
    }
  }

}

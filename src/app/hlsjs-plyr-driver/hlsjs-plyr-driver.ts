import * as Hls from 'hls.js';
import * as Plyr from 'plyr';
import { PlyrDriver, PlyrDriverCreateParams, PlyrDriverDestroyParams, PlyrDriverUpdateSourceParams } from '../../../projects/ngx-plyr/src/public_api';

export class HlsjsPlyrDriver implements PlyrDriver {

  hls = new Hls();

  private loaded = false;

  constructor(private autoload: boolean) {}

  create(params: PlyrDriverCreateParams) {
    this.hls.attachMedia(params.videoElement);

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
    this.hls.detachMedia();
    this.hls.destroy();
  }

  load(src: string) {
    if (!this.loaded) {
      this.loaded = true;
      this.hls.loadSource(src);
    }
  }

}

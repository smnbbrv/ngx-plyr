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

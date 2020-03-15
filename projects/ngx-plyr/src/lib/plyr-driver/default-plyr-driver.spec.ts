import * as Plyr from 'plyr';
import { DefaultPlyrDriver } from './default-plyr-driver';

describe('DefaultPlyrDriver', () => {
  it('should be created', () => {
    const driver = new DefaultPlyrDriver();
    expect(driver).toBeTruthy();
  });

  function createVideo() {
    const video = document.createElement('video');

    document.body.appendChild(video);

    return video;
  }

  describe('create', () => {
    it('should created Plyr by a given video tag', () => {
      const driver = new DefaultPlyrDriver();
      expect(driver.create({ videoElement: createVideo(), options: {} })).toBeTruthy();
      expect(driver.create({ videoElement: createVideo(), options: {} }) instanceof Plyr).toBeTruthy();
    });
  });

  describe('updateSource', () => {
    it('should assign Plyr source settings', () => {
      const driver = new DefaultPlyrDriver();
      const videoElement = createVideo();
      const plyr = driver.create({ videoElement: createVideo(), options: {} });

      expect(() => driver.updateSource({
        videoElement,
        plyr,
        source: {
          title: 'test title',
          poster: '',
          sources: [],
          tracks: [],
          type: 'video'
        }
      })).not.toThrow();
    });
  });

  describe('destroy', () => {
    it('should destroy Plyr instance', () => {
      const driver = new DefaultPlyrDriver();
      const plyr = driver.create({ videoElement: createVideo(), options: {} });

      expect(() => driver.destroy({ plyr })).not.toThrow();
    });
  });

});

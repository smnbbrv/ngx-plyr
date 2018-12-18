import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output, ViewChild } from '@angular/core';
import Plyr from 'plyr';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'plyr', // tslint:disable-line
  templateUrl: './plyr.component.html',
  styleUrls: ['./plyr.component.css'],
  exportAs: 'plyr'
})
export class PlyrComponent implements AfterViewInit, OnDestroy {

  playerChange = new BehaviorSubject<Plyr>(null);

  get player(): Plyr {
    return this.playerChange.getValue();
  }

  private events = new Map();

  @Input() private plyrType: Plyr.MediaType = 'video';

  @Input() private plyrTitle: string;

  @Input() private plyrPoster: string;

  @Input() private plyrSources: Plyr.Source[];

  @Input() private plyrTracks: Plyr.Track[];

  @ViewChild('v') private vr: ElementRef;

  // Standard Media Events
  @Output() plyrProgress = this.createLazyEvent('progress');
  @Output() plyrPlaying = this.createLazyEvent('playing');
  @Output() plyrPlay = this.createLazyEvent('play');
  @Output() plyrPause = this.createLazyEvent('pause');
  @Output() plyrTimeUpdate = this.createLazyEvent('timeupdate');
  @Output() plyrVolumeChange = this.createLazyEvent('volumechange');
  @Output() plyrSeeking = this.createLazyEvent('seeking');
  @Output() plyrSeeked = this.createLazyEvent('seeked');
  @Output() plyrRateChange = this.createLazyEvent('ratechange');
  @Output() plyrEnded = this.createLazyEvent('ended');
  @Output() plyrEnterFullScreen = this.createLazyEvent('enterfullscreen');
  @Output() plyrExitFullScreen = this.createLazyEvent('exitfullscreen');
  @Output() plyrCaptionsEnabled = this.createLazyEvent('captionsenabled');
  @Output() plyrCaptionsDisabled = this.createLazyEvent('captionsdisabled');
  @Output() plyrLanguageChange = this.createLazyEvent('languagechange');
  @Output() plyrControlsHidden = this.createLazyEvent('controlshidden');
  @Output() plyrControlsShown = this.createLazyEvent('controlsshown');
  @Output() plyrReady = this.createLazyEvent('ready');

  // HTML5 only
  @Output() plyrLoadStart = this.createLazyEvent('loadstart');
  @Output() plyrLoadedData = this.createLazyEvent('loadeddata');
  @Output() plyrLoadedMetadata = this.createLazyEvent('loadedmetadata');
  @Output() plyrQualityChange = this.createLazyEvent('qualitychange');
  @Output() plyrCanPlay = this.createLazyEvent('canplay');
  @Output() plyrCanPlayThrough = this.createLazyEvent('canplaythrough');
  @Output() plyrStalled = this.createLazyEvent('stalled');
  @Output() plyrWaiting = this.createLazyEvent('waiting');
  @Output() plyrEmptied = this.createLazyEvent('emptied');
  @Output() plyrCueChange = this.createLazyEvent('cuechange');
  @Output() plyrError = this.createLazyEvent('error');

  // YouTube only
  @Output() plyrStateChange = this.createLazyEvent('statechange');

  constructor(private ngZone: NgZone) { }

  ngOnDestroy(): void {
    this.destroyPlayer();
  }

  ngAfterViewInit() {
    this.initLib();

    this.player.source = {
      type: this.plyrType,
      title: this.plyrTitle,
      sources: this.plyrSources,
      poster: this.plyrPoster,
      tracks: this.plyrTracks,
    };
  }

  private initLib() {
    if (!this.player) {
      this.ngZone.runOutsideAngular(() => {
        this.destroyPlayer();
        this.playerChange.next(new Plyr(this.vr.nativeElement));
      });
    }
  }

  // see https://stackoverflow.com/a/53704102/1990451
  private createLazyEvent<T extends Plyr.PlyrEvent>(name: Plyr.StandardEvent | Plyr.Html5Event | Plyr.YoutubeEvent): EventEmitter<T> {
    return this.playerChange.pipe(
      filter(player => !!player),
      switchMap(() => new Observable(observer => this.on(name, (data: T) => this.ngZone.run(() => observer.next(data)))))
    ) as EventEmitter<T>;
  }

  private destroyPlayer() {
    if (this.player) {
      Array.from(this.events.keys()).forEach(name => this.off(name));
      this.player.destroy();
    }
  }

  private on(name: string, handler: any) {
    this.events.set(name, handler);
    this.player.on(name as any, handler);
  }

  private off(name: string) {
    this.player.off(name as any, this.events.get(name));
    this.events.delete(name);
  }

}

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import Plyr from 'plyr';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { DefaultPlyrDriver } from '../plyr-driver/default-plyr-driver';
import { PlyrDriver } from '../plyr-driver/plyr-driver';

interface PlyrSimpleChanges extends SimpleChanges {
  plyrType: SimpleChange;
  plyrTitle: SimpleChange;
  plyrPoster: SimpleChange;
  plyrSources: SimpleChange;
  plyrTracks: SimpleChange;
  plyrOptions: SimpleChange;
}

@Component({
  selector: 'plyr, [plyr]', // tslint:disable-line
  templateUrl: './plyr.component.html',
  styleUrls: ['./plyr.component.css'],
  exportAs: 'plyr'
})
export class PlyrComponent implements AfterViewInit, OnChanges, OnDestroy {

  private playerChange = new BehaviorSubject<Plyr>(null);

  get player(): Plyr {
    return this.playerChange.getValue();
  }

  private events = new Map();

  @Input() private plyrDriver: PlyrDriver;

  @Input() private plyrType: Plyr.MediaType = 'video';

  @Input() private plyrTitle: string;

  @Input() private plyrPoster: string;

  @Input() private plyrSources: Plyr.Source[];

  @Input() private plyrTracks: Plyr.Track[];

  @Input() private plyrOptions: Plyr.Options;

  @ViewChild('v') private vr: ElementRef;

  // ngx-plyr events
  @Output() plyrInit = this.playerChange.pipe(filter(player => !!player)) as EventEmitter<Plyr>;

  // standard media events
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

  // HTML5 events
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

  // YouTube events
  @Output() plyrStateChange = this.createLazyEvent('statechange');

  private subscriptions: Subscription[] = [];

  private driver: PlyrDriver;

  constructor(
    private ngZone: NgZone,
  ) {
  }

  ngOnChanges(changes: PlyrSimpleChanges) {
    this.subscriptions.push(this.plyrInit.pipe(first()).subscribe((player: Plyr) => {
      if (changes.plyrOptions) {
        if (!changes.plyrOptions.firstChange) {
          this.initPlyr(true);
        }
      } else {
        this.updatePlyrSource(player);
      }
    }));
  }

  ngOnDestroy() {
    this.destroyPlayer();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit() {
    this.initPlyr();
  }

  private initPlyr(force = false) {
    if (force || !this.player) {
      this.ngZone.runOutsideAngular(() => {
        this.destroyPlayer();

        this.driver = this.plyrDriver || new DefaultPlyrDriver();

        const newPlayer = this.driver.create({
          videoElement: this.videoElement,
          options: this.plyrOptions,
        });

        this.updatePlyrSource(newPlayer);

        this.playerChange.next(newPlayer);
      });
    }
  }

  private get videoElement() {
    return this.vr.nativeElement;
  }

  private updatePlyrSource(plyr: Plyr) {
    this.driver.updateSource({
      videoElement: this.videoElement,
      plyr,
      source: {
        type: this.plyrType,
        title: this.plyrTitle,
        sources: this.plyrSources,
        poster: this.plyrPoster,
        tracks: this.plyrTracks,
      },
    });
  }

  // see https://stackoverflow.com/a/53704102/1990451
  private createLazyEvent<T extends Plyr.PlyrEvent>(name: Plyr.StandardEvent | Plyr.Html5Event | Plyr.YoutubeEvent): EventEmitter<T> {
    return this.plyrInit.pipe(
      switchMap(() => new Observable(observer => this.on(name, (data: T) => this.ngZone.run(() => observer.next(data)))))
    ) as EventEmitter<T>;
  }

  private destroyPlayer() {
    if (this.player) {
      Array.from(this.events.keys()).forEach(name => this.off(name));
      this.driver.destroy({
        plyr: this.player,
      });
      if (this.vr.nativeElement.plyr) {
        delete this.vr.nativeElement.plyr;
        this.vr.nativeElement = this.player.elements.original
      }
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

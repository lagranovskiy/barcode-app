import { TimerService } from './../../services/timer/timer.service';
import { Spieltreffer } from './../../model/spieltreffer.class';
import { SpielfeldComponent } from './../../components/spielfeld/spielfeld.component';
import { CountdownComponent } from './../../components/countdown/countdown.component';
import { Spieler } from '../../model/spieler.class';
import { Spielfrage } from '../../model/spielfrage.interface';
import { FragenEinleseService } from './../../services/fragen-generator/fragen-generator.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Spieltyp } from 'src/app/model/spieltyp.enum';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Treffertyp } from 'src/app/model/treffertyp.enum';

@Component({
  selector: 'app-fruechte-des-geistes',
  templateUrl: './fruechte-des-geistes.component.html',
  styleUrls: ['./fruechte-des-geistes.component.scss'],
})
export class FruechteDesGeistesComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe = new Subject();
  private readonly spielzeitUnsubscribe = new Subject();
  private spielzeitSubscribtion: Subscription | undefined;

  spielfragen: Spielfrage[] = [];
  spieltreffer: Spieltreffer[] = [];

  spieler: Spieler | undefined;
  spielzeit: number = 10;

  spielerRegistriert = false;
  spielLauft = false;

  doppelscoreMode: boolean = false;

  // Subject zum einschalten von Countdown
  @ViewChild(CountdownComponent) countdownComponent!: CountdownComponent;
  @ViewChild(SpielfeldComponent) spielfeldComponent!: SpielfeldComponent;

  constructor(
    private fragenEinleseService: FragenEinleseService,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.fragenEinleseService
      .leseFragebogen(Spieltyp.FRUECHTE_DES_GEISTES)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((fragen) => (this.spielfragen = fragen));
  }

  spielerBereit(spieler: Spieler) {
    this.spieler = spieler;
    this.spielerRegistriert = true;
    this.spielLauft = true;
    this.countdownComponent?.startCountdown(3);
  }

  spielStarten() {
    this.spielfeldComponent.start();
    this.spielzeitEinstellen();
  }

  spielBeenden() {
    this.spielfeldComponent.stop();
    this.spielLauft = false;
  }

  neueTreffer(treffer: Spieltreffer) {
    if (this.doppelscoreMode) {
      treffer.scoreVerdoppeln();
    }
    this.spieltreffer.push(treffer);
    switch (treffer.typ) {
      case Treffertyp.EIGENSCHAFT:
        break;
      case Treffertyp.ZUSATZZEIT:
        this.spielzeit = this.spielzeit + treffer.tatsaechlicheScore;
        this.spielzeitEinstellen();
        break;
      case Treffertyp.DOPPELTE_SCORE:
        this.doppelscoreMode = true;
        this.timerService
          .erstelleCountdown(treffer.tatsaechlicheScore, 1000)
          .subscribe({
            complete: () => {
              this.doppelscoreMode = false;
            },
          });
        break;
    }
  }

  private spielzeitEinstellen() {
    if(this.spielzeitSubscribtion){
      this.spielzeitSubscribtion?.unsubscribe();
    }

    this.spielzeitUnsubscribe.next(true);
    this.spielzeitUnsubscribe.complete();

    this.spielzeitSubscribtion = this.timerService
      .erstelleCountdown(this.spielzeit, 1000)
      .pipe(takeUntil(this.spielzeitUnsubscribe))
      .subscribe({
        next: (countdown) => (this.spielzeit = countdown),
        complete: () => {
          this.spielBeenden();
        },
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}

import { Record } from './../../model/record.class';
import { RecordStorageService } from './../../services/record-storage/record-storage.service';
import { TimerService } from './../../services/timer/timer.service';
import { Spieltreffer } from './../../model/spieltreffer.class';
import { SpielfeldComponent } from './../../components/spielfeld/spielfeld.component';
import { CountdownComponent } from './../../components/countdown/countdown.component';
import { Spieler } from '../../model/spieler.class';
import { Spielfrage } from '../../model/spielfrage.interface';
import { FragenEinleseService } from './../../services/fragen-generator/fragen-generator.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Spieltyp } from 'src/app/model/spieltyp.enum';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Treffertyp } from 'src/app/model/treffertyp.enum';

@Component({
  selector: 'app-aposteln',
  templateUrl: './aposteln.component.html',
  styleUrls: ['./aposteln.component.scss'],
})
export class ApostelnComponent implements OnInit, OnDestroy {
  private readonly SPIELZEIT = 30;
  private readonly ngUnsubscribe = new Subject();
  private readonly spielzeitUnsubscribe = new Subject();
  private spielzeitSubscribtion: Subscription | undefined;

  spielfragen: Spielfrage[] = [];
  spieltreffer: Spieltreffer[] = [];

  spieler: Spieler = { name: 'Unbekannt', alter: 10 };
  spielzeit: number = this.SPIELZEIT;

  spielerRegistriert = false;
  spielLauft = false;

  doppelscoreMode: boolean = false;

  @ViewChild(CountdownComponent) countdownComponent!: CountdownComponent;
  @ViewChild(SpielfeldComponent) spielfeldComponent!: SpielfeldComponent;

  constructor(
    private fragenEinleseService: FragenEinleseService,
    private timerService: TimerService,
    private recordStorage: RecordStorageService
  ) {}

  ngOnInit(): void {
    this.fragenEinleseService
      .leseFragebogen(Spieltyp.APOSTELN)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((fragen) => (this.spielfragen = fragen));
  }

  spielWiederholen() {}

  spielerBereit(spieler: Spieler) {
    this.spieler = spieler;
    this.spielerRegistriert = true;
    this.spielLauft = true;

    if(this.spieler.alter <= 7){
      this.spielzeit = 90;
    } else if (this.spieler.alter <= 9){
      this.spielzeit = 80;
    } else if (this.spieler.alter <= 11){
      this.spielzeit = 70;
    } else if (this.spieler.alter <= 13){
      this.spielzeit = 60;
    } else {
      this.spielzeit = 50;
    }

    this.countdownComponent?.startCountdown(3);
  }

  spielErneutStarten() {
    this.spieltreffer = [];
    this.spielerRegistriert = false;
    this.spielzeit = this.SPIELZEIT;
  }

  spielStarten() {
    this.spielfeldComponent.start();
    this.spielzeitEinstellen();
  }

  spielBeenden() {
    this.spielfeldComponent.stop();
    this.spielLauft = false;
    this.ergebnisSpeichern();
  }

  ergebnisSpeichern() {
    var currentScore = this.spieltreffer.reduce((sum, current) => {
      var score = current.tatsaechlicheScore as number | 0;
      return sum + score;
    }, 0);

    var record: Record = {
      spieler: this.spieler,
      punktestand: currentScore,
      datum: new Date(),
    };
    this.recordStorage.storeRecord(Spieltyp.APOSTELN, record);
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
    if (this.spielzeitSubscribtion) {
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

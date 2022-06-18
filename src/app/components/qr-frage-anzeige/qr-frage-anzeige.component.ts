import { Spieltreffer } from './../../model/spieltreffer.class';
import { timer, Subject, takeUntil } from 'rxjs';
import { Spielfrage } from './../../model/spielfrage.interface';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-qr-frage-anzeige',
  templateUrl: './qr-frage-anzeige.component.html',
  styleUrls: ['./qr-frage-anzeige.component.scss'],
})
export class QrFrageAnzeigeComponent implements OnInit, OnDestroy {
  @Input()
  spielfragen: Spielfrage[] = [];

  @Output()
  readonly qrcodeGetroffen: EventEmitter<Spieltreffer> = new EventEmitter<Spieltreffer>();

  aktuelleCode!: string;
  aktuelleFrage: Spielfrage | undefined;
  aktuelleCountdown: number = 5;

  spielLauft: boolean = false;
  aktivesWarten: boolean = false;
  codeSichtbar: boolean = false;

  private timer = timer(0, 1000);
  private readonly ngUnsubscribe = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.timer.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      if (this.aktuelleCountdown > 0) {
        this.aktuelleCountdown--;

        if (this.aktuelleCountdown === 0) {
          if (this.aktivesWarten) {
            this.aktivesWarten = false;
            this.spielLauft = true;
            this.codeSichtbar = true;
            this.aktuelleCountdown = this.getZufallszahl(3, 10);
            this.getNeueZufallsfrage();
          } else if (this.spielLauft) {
            this.codeSichtbar = true;
            this.aktuelleCountdown = this.getZufallszahl(3, 10);
            this.getNeueZufallsfrage();
          }
        }
      }
    });
  }

  shoot(shootCode: string) {
    if (this.aktuelleCode === shootCode) {
      console.log('Treffer!!' + shootCode);
      this.codeSichtbar = false;
      var treffer : Spieltreffer = {frage: this.aktuelleFrage, tatsaechlicheScore: this.aktuelleFrage?.score, verwendeteCode: shootCode}
      this.qrcodeGetroffen.emit(treffer);
    }
  }

  start() {
    this.aktivesWarten = true;
    this.aktuelleCountdown = this.getZufallszahl(0, 6);
  }

  stop() {
    this.aktuelleFrage = undefined;
    this.aktuelleCode = '';
    this.aktivesWarten = false;
    this.spielLauft = false;
    this.codeSichtbar = false;
    this.aktuelleCountdown = 0;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  private getNeueZufallsfrage() {
    var zufallsorder = this.getZufallszahl(0, this.spielfragen.length - 1);
    this.aktuelleFrage = this.spielfragen[zufallsorder];
    this.aktuelleCode = 'q' + this.getZufallszahl(1000000, 9999999);
  }

  private getZufallszahl(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }
}

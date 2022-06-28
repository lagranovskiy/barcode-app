import { TimerService } from './../../services/timer/timer.service';
import { Spieltreffer } from './../../model/spieltreffer.class';
import { timer, Subject, takeUntil, Observable, Subscription } from 'rxjs';
import { Spielfrage } from './../../model/spielfrage.interface';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Treffertyp } from 'src/app/model/treffertyp.enum';

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
  aktuelleScore: number = 0;

  aktuelleIcon: string = './assets/taget.png';

  spielLauft: boolean = false;
  codeSichtbar: boolean = false;

  aktuelleCountdownSubscription: Subscription | undefined;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {}

  shoot(shootCode: string) {
    if (this.aktuelleFrage == undefined) {
      return;
    }

    if (this.aktuelleCode === shootCode) {
      var spieltreffer: Spieltreffer = new Spieltreffer();
      spieltreffer.titel = this.aktuelleFrage.titel;
      spieltreffer.typ = this.aktuelleFrage.typ;
      spieltreffer.tatsaechlicheScore = this.aktuelleScore;
      spieltreffer.verwendeteCode = shootCode;
      spieltreffer.antwortKorrekt = this.aktuelleFrage.korrekt;

      if (!spieltreffer.antwortKorrekt) {
        spieltreffer.scoreNegieren();
      }

      this.codeSichtbar = false;
      this.qrcodeGetroffen.emit(spieltreffer);
      this.aktuelleCountdownSubscription?.unsubscribe();
      this.timerService.erstelleCountdown(2, 1000).subscribe({
        complete: () => {
          this.startQrAnzeige();
          this.codeSichtbar = true;
        },
      });
    }
  }

  start() {
    this.spielLauft = true;
    this.codeSichtbar = true;
    this.startQrAnzeige();
  }

  stop() {
    this.aktuelleFrage = undefined;
    this.aktuelleCode = '';
    this.spielLauft = false;
    this.codeSichtbar = false;
  }

  ngOnDestroy(): void {}

  /**
   * Rekursive Method der verwendet wird um die Qr Codes nacheinander anzuzeigen.
   */
  private startQrAnzeige() {
    var qrCodeAnzeigenZeit = this.getZufallszahl(5, 15);
    this.getNeueZufallsfrage();

    this.aktuelleCountdownSubscription = this.timerService
      .erstelleCountdown(qrCodeAnzeigenZeit * 2, 500)
      .subscribe({
        next: () => {
          if (this.aktuelleFrage == undefined) {
            return;
          }
          if (this.aktuelleFrage.typ === Treffertyp.EIGENSCHAFT) {
            /**
             * Bei jedem call wollen wir die tatsächliche Punkte reduzieren jedoch nicht um mehr als 10%
             */
            var maxPunktabzug = this.aktuelleFrage?.score / 10;
            var punktabzug = this.getZufallszahl(1, maxPunktabzug);
            if (this.aktuelleScore - punktabzug <= 0) {
              this.aktuelleScore = 0;
            } else {
              this.aktuelleScore = this.aktuelleScore - punktabzug;
            }
          }
        },
        complete: () => {
          if (!this.spielLauft) {
            return;
          }

          if (this.codeSichtbar == true) {
            // nicht getroffen, dann kurze Pause und dann wieder anzeigen
            this.codeSichtbar = false;
            this.timerService.erstelleCountdown(2, 1000).subscribe({
              complete: () => {
                this.codeSichtbar = true;
                this.startQrAnzeige();
              },
            });
          } else {
            // Getroffe, dann wieder sichtbar machen
            this.codeSichtbar = true;
            this.startQrAnzeige();
          }
        },
      });
  }

  private getNeueZufallsfrage() {
    var zufallsorder =
      this.getZufallszahl(0, 1000) % (this.spielfragen.length - 1);
    this.aktuelleFrage = this.spielfragen[zufallsorder];
    this.aktuelleCode = 'q' + this.getZufallszahl(1000000, 9999999);
    this.aktuelleScore = this.aktuelleFrage.score;
    this.aktuelleIcon = this.updateIcon();
  }

  private updateIcon(): string {
    switch (this.aktuelleFrage?.typ) {
      case Treffertyp.DOPPELTE_SCORE:
        return './assets/money.png';
      case Treffertyp.EIGENSCHAFT:
        return './assets/target.png';
      case Treffertyp.ZUSATZZEIT:
        return './assets/time.png';
    }
    return './assets/taget.png';
  }

  private getZufallszahl(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

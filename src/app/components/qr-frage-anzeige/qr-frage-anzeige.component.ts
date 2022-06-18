import { TimerService } from './../../services/timer/timer.service';
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
  aktuelleScore: number = 0;

  spielLauft: boolean = false;
  codeSichtbar: boolean = false;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {}

  shoot(shootCode: string) {
    if (this.aktuelleFrage == undefined) {
      return;
    }

    if (this.aktuelleCode === shootCode) {
      this.codeSichtbar = false;

      var spieltreffer: Spieltreffer = new Spieltreffer();
      spieltreffer.titel = this.aktuelleFrage.titel;
      spieltreffer.typ = this.aktuelleFrage.typ;
      spieltreffer.tatsaechlicheScore = this.aktuelleScore;
      spieltreffer.verwendeteCode = shootCode;
      spieltreffer.antwortKorrekt = this.aktuelleFrage.korrekt;

      if (!spieltreffer.antwortKorrekt) {
        spieltreffer.scoreNegieren();
      }
      this.qrcodeGetroffen.emit(spieltreffer);
    }
  }

  start() {
    var wartezeit = this.getZufallszahl(0, 6);

    // Aktiv random warten und erst danach starten
    this.timerService.erstelleCountdown(wartezeit, 1000).subscribe({
      error: (err) => console.error(err),
      complete: () => {
        this.spielLauft = true;
        this.codeSichtbar = true;
        this.startQrAnzeige();
      },
    });
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
    var qrCodeAnzeigenZeit = this.getZufallszahl(3, 10);
    this.getNeueZufallsfrage();

    this.timerService.erstelleCountdown(qrCodeAnzeigenZeit, 1000).subscribe({
      next: () => {
        if (this.aktuelleFrage == undefined) {
          return;
        }
        /**
         * Bei jedem call wollen wir die tatsächliche Punkte reduzieren jedoch nicht um mehr als 10%
         */
        var maxPunktabzug = this.aktuelleFrage?.score / 10;
        var punktabzug = this.getZufallszahl(1, maxPunktabzug);
        if (this.aktuelleScore - punktabzug == 0) {
          this.aktuelleScore = 0;
        } else {
          this.aktuelleScore = this.aktuelleScore - punktabzug;
        }
      },
      complete: () => {
        if (!this.spielLauft) {
          return;
        }
        this.codeSichtbar = true;
        this.startQrAnzeige();
      },
    });
  }

  private getNeueZufallsfrage() {
    var zufallsorder = this.getZufallszahl(0, this.spielfragen.length - 1);
    this.aktuelleFrage = this.spielfragen[zufallsorder];
    this.aktuelleCode = 'q' + this.getZufallszahl(1000000, 9999999);
    this.aktuelleScore = this.aktuelleFrage.score;
  }

  private getZufallszahl(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

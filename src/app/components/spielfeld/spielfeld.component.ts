import { Spieltreffer } from './../../model/spieltreffer.class';
import { QrFrageAnzeigeComponent } from './../qr-frage-anzeige/qr-frage-anzeige.component';
import { Spielfrage } from './../../model/spielfrage.interface';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChildren,
} from '@angular/core';
import { _isNumberValue } from '@angular/cdk/coercion';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-spielfeld',
  templateUrl: './spielfeld.component.html',
  styleUrls: ['./spielfeld.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)',
  },
})
export class SpielfeldComponent implements OnInit {
  @Input()
  spielfragen: Spielfrage[] = [];

  @Input()
  spielerAlter: number = 10;

  @Output()
  readonly qrcodeGetroffen: EventEmitter<Spieltreffer> = new EventEmitter<Spieltreffer>();

  @ViewChildren(QrFrageAnzeigeComponent) qrFelder!: QrFrageAnzeigeComponent[];

  aktuellerQrCode: string = '';

  constructor(private snackBar: MatSnackBar) {}

  getroffen(frage: Spieltreffer) {
    this.snackBar.open(frage.tatsaechlicheScore + ' очков', undefined, {
      duration: 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    this.qrcodeGetroffen.emit(frage);
  }

  shoot(shootCode: any) {
    this.qrFelder.forEach((feld) => feld.shoot(shootCode));
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.code === 'Enter') {
      this.shoot(this.aktuellerQrCode);
      this.aktuellerQrCode = '';
    } else {
      this.aktuellerQrCode += event.key;
    }
  }

  start() {
    this.qrFelder.forEach((feld) => feld.start());
  }

  stop() {
    this.qrFelder.forEach((feld) => feld.stop());
  }

  ngOnInit(): void {}
}

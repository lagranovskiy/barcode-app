import { QrFrageAnzeigeComponent } from './../qr-frage-anzeige/qr-frage-anzeige.component';
import { Spielfrage } from './../../model/spielfrage.interface';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-spielfeld',
  templateUrl: './spielfeld.component.html',
  styleUrls: ['./spielfeld.component.scss'],
})
export class SpielfeldComponent implements OnInit {
  @Input()
  spielfragen: Spielfrage[] = [];

  @Output()
  readonly qrcodeGetroffen: EventEmitter<Spielfrage> = new EventEmitter<Spielfrage>();

  @ViewChildren(QrFrageAnzeigeComponent) qrFelder!: QrFrageAnzeigeComponent[];

  constructor() {}

  getroffen(frage: Spielfrage) {
    this.qrcodeGetroffen.emit(frage);
  }

  shoot(shootCode: string) {
    this.qrFelder.forEach((feld) => feld.shoot(shootCode));
  }

  start() {
    this.qrFelder.forEach((feld) => feld.start());
  }

  stop() {
    this.qrFelder.forEach((feld) => feld.stop());
  }

  ngOnInit(): void {}
}

import { SpielfeldComponent } from './../../components/spielfeld/spielfeld.component';
import { CountdownComponent } from './../../components/countdown/countdown.component';
import { Spieler } from './../../model/spieler.interface';
import { Spielfrage } from '../../model/spielfrage.interface';
import { FragenEinleseService } from './../../services/fragen-generator/fragen-generator.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { SpielType } from 'src/app/model/spiel-type.enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fruechte-des-geistes',
  templateUrl: './fruechte-des-geistes.component.html',
  styleUrls: ['./fruechte-des-geistes.component.scss'],
})
export class FruechteDesGeistesComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe = new Subject();

  spielfragen: Spielfrage[] = [];
  spieler: Spieler | undefined;
  spielzeit: number = 90;

  spielstart = false;

  // Subject zum einschalten von Countdown
  @ViewChild(CountdownComponent) countdownComponent!: CountdownComponent;
  @ViewChild(SpielfeldComponent) spielfeldComponent!: SpielfeldComponent;

  constructor(private fragenEinleseService: FragenEinleseService) {}

  ngOnInit(): void {
    this.fragenEinleseService
      .leseFragebogen(SpielType.FRUECHTE_DES_GEISTES)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((fragen) => (this.spielfragen = fragen));
  }

  spielerBereit(spieler: Spieler) {
    this.spieler = spieler;
    this.spielstart = true;
    this.countdownComponent?.startCountdown(5);
  }

  spielStarten() {
    this.spielfeldComponent.start();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}

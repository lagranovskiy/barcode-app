import { FruechteDesGeistesComponent } from './../fruechte-des-geistes/fruechte-des-geistes.component';
import { Spieler } from './../../model/spieler.class';
import { Spieltyp } from 'src/app/model/spieltyp.enum';
import { RecordStorageService } from './../../services/record-storage/record-storage.service';
import { Record } from '../../model/record.class';
import { Component, OnInit, Input } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.scss'],
})
export class RecordViewComponent implements OnInit {
  constructor(private recordStorage: RecordStorageService) {}

  ngOnInit(): void {}

  getRecordList(spieltyp: string): Record[] {
    var spiel = this.getCorrectEnum(spieltyp);
    var allResults = this.recordStorage.readRecords(spiel);
    return allResults.slice(0,10);
  }

  clearStatistics(spieltyp: string) {
    var spiel = this.getCorrectEnum(spieltyp);
    return this.recordStorage.clear(spiel);
  }

  getCorrectEnum(spiel: string): Spieltyp {
    switch (spiel) {
      case 'FRUECHTE_DES_GEISTES':
        return Spieltyp.FRUECHTE_DES_GEISTES;

      case 'SAUBER_UNSAUBER':
        return Spieltyp.SAUBER_UNSAUBER;
    }
    return Spieltyp.FRUECHTE_DES_GEISTES;
  }
}

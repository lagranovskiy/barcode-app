import { Spieltyp } from 'src/app/model/spieltyp.enum';
import { Record } from './../../model/record.class';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecordStorageService {
  constructor() {}

  /**
   * Removes all of the currently stored items
   */
  clear(spieltyp: Spieltyp) {
    localStorage.setItem(spieltyp, JSON.stringify([]));
  }

  /**
   * stores and reorders current record list
   *
   * @param record record to be stored
   * @returns
   */
  storeRecord(spieltyp: Spieltyp, record: Record): Record[] {
    var currentState = localStorage.getItem(spieltyp);

    if (!currentState || currentState == undefined) {
      currentState = JSON.stringify([]);
      localStorage.setItem(spieltyp, currentState);
    }

    var recordList: Record[] = JSON.parse(currentState);
    recordList.push(record);
    recordList.sort((a, b) => b.punktestand - a.punktestand);
    localStorage.setItem(spieltyp, JSON.stringify(recordList));

    return recordList;
  }

  /**
   *
   * @returns Reads current list of records or empty array if nothing found
   */
  readRecords(spieltyp: Spieltyp): Record[] {
    var currentState = localStorage.getItem(spieltyp);

    if (!currentState || currentState == undefined) {
      return [];
    }

    return JSON.parse(currentState);
  }
}

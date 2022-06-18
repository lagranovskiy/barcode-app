import { Spielfrage } from '../../model/spielfrage.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Spieltyp } from 'src/app/model/spieltyp.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FragenEinleseService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Liest die Spielfragen aus
   *
   * @param spielType typ des Spiels zum laden
   */
  leseFragebogen(spielType: Spieltyp):Observable<Spielfrage[]>{
    return this.httpClient.get<Spielfrage[]>(spielType);
  }
}

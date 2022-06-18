import { Spielfrage } from '../../model/spielfrage.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpielType } from 'src/app/model/spiel-type.enum';
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
  leseFragebogen(spielType: SpielType):Observable<Spielfrage[]>{
    return this.httpClient.get<Spielfrage[]>(spielType);
  }
}

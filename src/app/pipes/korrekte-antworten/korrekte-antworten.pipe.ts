import { Spieltreffer } from './../../model/spieltreffer.class';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'korrekteAntworten',
  pure: false,
})
export class KorrekteAntwortenPipe implements PipeTransform {

  transform(spieltreffer: Spieltreffer[]): number {
    if (spieltreffer == undefined || spieltreffer.length === 0) {
      return 0;
    }

    return spieltreffer.filter(t=>t.antwortKorrekt).length;
  }

}

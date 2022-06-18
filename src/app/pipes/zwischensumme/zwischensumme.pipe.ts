import { Spieltreffer } from './../../model/spieltreffer.class';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zwischensumme',
  pure: false,
})
export class ZwischensummePipe implements PipeTransform {
  transform(spieltreffer: Spieltreffer[]): number {
    if (spieltreffer == undefined || spieltreffer.length === 0) {
      return 0;
    }

    return spieltreffer.reduce((sum, current) => {
      var score = current.tatsaechlicheScore as number | 0;
      return sum + score;
    }, 0);
  }
}

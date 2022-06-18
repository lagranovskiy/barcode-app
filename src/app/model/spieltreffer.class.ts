import { Treffertyp } from './treffertyp.enum';
import { Spielfrage } from './spielfrage.interface';

export class Spieltreffer {
  titel!: string;
  typ!: Treffertyp;
  verwendeteCode!: string;
  tatsaechlicheScore!: number;
  antwortKorrekt!: boolean;

  zeitstempel: Date = new Date();

  istDupliziert: boolean = false;
  /**
   * Verdoppelt das aktuelle Score
   */
  scoreVerdoppeln() {
    this.tatsaechlicheScore += this.tatsaechlicheScore;
    this.istDupliziert = true;
  }

  scoreNegieren() {
    this.tatsaechlicheScore *= -1;
  }
}

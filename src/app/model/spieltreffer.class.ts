import { Spielfrage } from './spielfrage.interface';

export interface Spieltreffer {

  frage?: Spielfrage;
  verwendeteCode?: string;
  tatsaechlicheScore?: number;

}

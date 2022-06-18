import { Treffertyp } from "./treffertyp.enum";

export interface Spielfrage {
  titel: string;
  score: number;
  korrekt: true;
  typ: Treffertyp
}

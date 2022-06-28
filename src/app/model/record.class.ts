import { Spieler } from './spieler.class';
export class Record {
  public spieler!: Spieler;
  public punktestand!: number;
  public datum: Date = new Date();
}

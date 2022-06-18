import { Observable, Subject, takeUntil } from 'rxjs';
import { Spieltreffer } from './../../model/spieltreffer.class';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.scss'],
})
export class GameStatisticsComponent implements OnInit {
  @Input()
  spieltreffer!: Spieltreffer[];

  @Input()
  spielzeit: number = 0;

  @Input()
  detailsAnzeigen: boolean = false;

  displayedColumns: string[] = [
    'titel'
  ];

  constructor() {}

  ngOnInit(): void {}

}

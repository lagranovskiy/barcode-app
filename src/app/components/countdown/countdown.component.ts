import { BehaviorSubject, Subject, take, takeUntil, timer } from 'rxjs';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Output()
  readonly countdownAbgelaufen: EventEmitter<boolean> = new EventEmitter<boolean>();

  countdownTime: number = 0;
  isShown: boolean = false;

  private timer = timer(0, 1000);

  private readonly ngUnsubscribe = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.timer
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (this.countdownTime > 0) {
          this.countdownTime--;

          if (this.countdownTime === 0) {
            this.countdownAbgelaufen.emit(true);
            this.isShown = false;
          }
        }
      });
  }

  startCountdown(seconds: number) {
    this.countdownTime = seconds;
    this.isShown = true;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}

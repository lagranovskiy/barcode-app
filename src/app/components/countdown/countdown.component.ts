import { TimerService } from './../../services/timer/timer.service';
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

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {}

  startCountdown(seconds: number) {
    this.countdownTime = seconds;
    this.isShown = true;

    this.timerService
      .erstelleCountdown(seconds, 1000)
      .subscribe({
        next: (countdown) => (this.countdownTime = countdown),
        error: (err) => console.error(err),
        complete: () => {
          this.countdownAbgelaufen.emit(true);
          this.isShown = false;
        },
      });
  }

  ngOnDestroy(): void {

  }
}

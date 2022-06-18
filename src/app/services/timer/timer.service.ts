import { timer, Observable, Subject, takeUntil } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}

  erstelleCountdown(dauer: number, period: number): Observable<number> {
    var countdownTime = dauer;
    var ngUnsubscribe = new Subject();
    var hearbeatSubject = new Subject<number>();

    timer(0, period)
      .pipe(takeUntil(ngUnsubscribe))
      .subscribe(() => {
        if (countdownTime > 0) {
          countdownTime--;
          hearbeatSubject.next(countdownTime);

          if (countdownTime === 0) {
            hearbeatSubject.complete();
            ngUnsubscribe.next(true);
            ngUnsubscribe.complete();
          }
        }
      });

    return hearbeatSubject.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceWidthService {

  private screenSizeSubject: BehaviorSubject<string>;
  screenSize$: Observable<string>;

  constructor() {
    this.screenSizeSubject = new BehaviorSubject<string>(this.getScreenSize(window.innerWidth));
    this.screenSize$ = this.screenSizeSubject.asObservable();
    this.setupResizeListener();
  }

  private setupResizeListener(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(300), // to limit emitation of size
        map((event: any) => event.target.innerWidth),
        startWith(window.innerWidth)
      )
      .subscribe((width: number) => {
        const newSize = this.getScreenSize(width);
        if (newSize !== this.screenSizeSubject.value) {
          this.screenSizeSubject.next(newSize);
        }
      });
  }

  private getScreenSize(innerWidth: number): string {
    if (innerWidth < 750) {
      return 'sm';
    } else if (innerWidth <= 992) {
      return 'md';
    } else if (innerWidth <= 1200) {
      return 'lg';
    } else {
      return 'xl';
    }
  }
}

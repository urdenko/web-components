import html from './main.element.html';
import style from './main.element.scss';

import { WebComponent, CustomElement } from '@web-components/engine';
import { ListItemElement } from '../list-item/list-item.element';
import { fromEvent, BehaviorSubject, interval, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@WebComponent({
  selector: 'web-components-main',
  template: html,
  styles: [style]
})
export class MainElement extends CustomElement {
  private total = new BehaviorSubject<number>(0);

  private clearAllEvent = new Subject<void>();

  public connectedCallback(): void {
    this.subscribeToButtonsClick();
    this.subscribeToTotalChange();
    this.subscribeToClearAllEvent();
  }

  private subscribeToButtonsClick(): void {
    fromEvent(this.componentShadowRoot.getElementById('add-clock'), 'click').subscribe(() => {
      this.addClockToList();
    });

    fromEvent(this.componentShadowRoot.getElementById('add-1000-clocks'), 'click').subscribe(() => {
      this.add1000ClocksToList();
    });

    fromEvent(this.componentShadowRoot.getElementById('clear-all'), 'click').subscribe(() => {
      this.clearAllEvent.next();
    });
  }

  private add1000ClocksToList(): void {
    new Array(1000).fill(null).forEach(() => {
      this.addClockToList();
    });
  }

  private addClockToList(): void {
    const listContainer = this.componentShadowRoot.getElementById('list-container');
    const listItem = document.createElement('web-components-list-item') as ListItemElement;
    this.setDateToClock(listItem.text);
    listContainer.appendChild(listItem);

    this.total.next(this.total.value + 1);
  }

  private setDateToClock(clock: BehaviorSubject<string>): void {
    interval(1000)
      .pipe(takeUntil(this.clearAllEvent))
      .subscribe(() => {
        const time = new Date();
        const hours = this.formattingToTime(time.getHours());
        const minutes = this.formattingToTime(time.getMinutes());
        const seconds = this.formattingToTime(time.getSeconds());
        clock.next(`${hours}:${minutes}:${seconds}`);
      });
  }

  private formattingToTime(time: number): string {
    return (time > 9 && time.toString()) || '0' + time;
  }

  private subscribeToTotalChange(): void {
    this.total.pipe(debounceTime(50)).subscribe(newTotal => {
      this.componentShadowRoot.getElementById('total').textContent = `total: ${newTotal}`;

      const listContainer = this.componentShadowRoot.getElementById('list-container');
      listContainer.scrollTo(0, listContainer.scrollHeight);
    });
  }

  private subscribeToClearAllEvent(): void {
    this.clearAllEvent.subscribe(() => {
      const listContainer = this.componentShadowRoot.getElementById('list-container');
      listContainer.innerHTML = '';
      this.total.next(0);
    });
  }
}

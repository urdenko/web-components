import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export class CommonButton extends HTMLButtonElement {
  private unsubscriber = new Subject<void>();

  private clickAnimationName = 'click';

  constructor() {
    super();
  }

  public connectedCallback(): void {
    this.subscribeToClick();
  }

  public disconnectedCallback(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private subscribeToClick(): void {
    this.animatingClickEvent();
    this.removingAnimationAfterClick();
  }

  private animatingClickEvent(): void {
    fromEvent<MouseEvent>(this, 'click')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
        this.style.animationName = this.clickAnimationName;
      });
  }

  private removingAnimationAfterClick(): void {
    fromEvent<AnimationEvent>(this, 'animationend')
      .pipe(
        takeUntil(this.unsubscriber),
        filter(animationEvent => animationEvent.animationName === this.clickAnimationName)
      )
      .subscribe(() => (this.style.animationName = null));
  }
}

customElements.define('common-button', CommonButton, { extends: 'button' });

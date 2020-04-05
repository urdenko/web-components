import html from './list-item.element.html';
import style from './list-item.element.scss';

import { WebComponent, CustomElement } from '@web-components/engine';
import { BehaviorSubject } from 'rxjs';

@WebComponent({
  selector: 'web-components-list-item',
  template: html,
  styles: [style]
})
export class ListItemElement extends CustomElement {
  public text = new BehaviorSubject<string>('preparing ...');

  public connectedCallback(): void {
    this.subscribeToTextChange();
  }

  public disconnectedCallback(): void {
    this.text.complete();
  }

  private subscribeToTextChange(): void {
    this.text.subscribe(newText => {
      this.componentShadowRoot.getElementById('text-container').textContent = newText;
    });
  }
}

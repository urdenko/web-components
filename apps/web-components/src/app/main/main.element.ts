import html from './main.element.html';
import style from './main.element.scss';

import { WebComponent, CustomElement } from '@web-components/engine';

@WebComponent({
  selector: 'web-components-main',
  template: html,
  styles: [style]
})
export class MainElement extends CustomElement {
  public connectedCallback(): void {
    const listItem = document.createElement('web-components-list-item');
    this.appendChild(listItem);
  }
}

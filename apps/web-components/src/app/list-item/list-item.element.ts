import html from './list-item.element.html';
import style from './list-item.element.scss';

import { WebComponent, CustomElement } from '@web-components/engine';

@WebComponent({
  selector: 'web-components-list-item',
  template: html,
  styles: [style]
})
export class ListItemElement extends CustomElement {}

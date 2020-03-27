import html from './header.element.html';
import style from './header.element.scss';

import { WebComponent, CustomElement } from '@web-components/engine';

@WebComponent({
  selector: 'web-components-header',
  template: html,
  styles: [style]
})
export class HeaderElement extends CustomElement {}

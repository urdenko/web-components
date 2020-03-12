import html from './app.element.html';
import style from './app.element.scss';

import { WebComponent, CustomElement } from '@web-components/engine';

@WebComponent({
  selector: 'web-components-root',
  template: html,
  styles: [style]
})
export class AppElement extends CustomElement {}

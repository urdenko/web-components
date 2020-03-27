import html from './footer.element.html';
import style from './footer.element.scss';

import { WebComponent, CustomElement } from '@web-components/engine';

@WebComponent({
  selector: 'web-components-footer',
  template: html,
  styles: [style]
})
export class FooterElement extends CustomElement {}

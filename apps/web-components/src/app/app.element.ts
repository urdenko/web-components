import html from './app.element.html';

export class AppElement extends HTMLElement {
  private _shadow: ShadowRoot;

  constructor() {
    super();
    this.init();
  }

  private init(): void {
    this._shadow = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = html;
    this._shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('web-components-root', AppElement);

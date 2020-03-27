import { CustomElement } from '../models/custom-element';
import { WebComponentConfig } from '../models/web-component-config';

export const WebComponent = (config: WebComponentConfig) => (
  сustomElement: typeof CustomElement
) => {
  if (config.selector.indexOf('-') <= 0) {
    throw new Error('You need at least 1 dash in the custom element selector!');
  }

  if (!config.template) {
    throw new Error('You need to pass a template for the element');
  }

  const template = document.createElement('template');
  const styles = config.styles.reduce(
    (compileStyles, style) => `${compileStyles}\n<style>\n${style}\n</style>`,
    ''
  );

  template.innerHTML = config.template + styles;

  const connectedCallback = сustomElement.prototype.connectedCallback;

  сustomElement.prototype.connectedCallback = function() {
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));

    connectedCallback.call(this);
  };

  window.customElements.define(config.selector, сustomElement);
};

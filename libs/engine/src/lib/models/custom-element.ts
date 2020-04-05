export class CustomElement extends HTMLElement {
  /** Hook is called after init of component in the DOM */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public connectedCallback() {}

  /** a document fragment that gets attached to a “host” element */
  public componentShadowRoot: ShadowRoot;

  /** Hook is called after disconnected of component from the DOM */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public disconnectedCallback() {}
}

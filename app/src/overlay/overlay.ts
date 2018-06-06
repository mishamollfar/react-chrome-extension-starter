export class Overlay {

  private overlayElement: HTMLDivElement;
  private childElement: HTMLDivElement;
  public closed = false;

  static create() {
    return new Overlay();
  }

  constructor() {
    this.attachOverlay();
  }

  closeOverlay() {
    this.detachOverlay();

    this.closed = true;
    return true;
  }

  attachChild(element) {
    this.overlayElement.innerHTML = '';
    this.childElement = element;
    this.overlayElement.appendChild(element);
  }

  detachChild() {
    this.overlayElement.removeChild(this.childElement);
  }

  attachOverlay() {
    const body = document.body;

    const overlayNumber = new Date().getTime();

    const overlay = document.createElement('div');
    overlay.classList.add('extension-overlay');
    overlay.setAttribute('id', 'extension_overlay_' + overlayNumber);
    overlay.setAttribute('style',
      'background: rgba(136, 136, 136, 0.8); width: 100%; height: 100%; z-index: 10000; position: fixed; top: 0; left: 0;');

    body.appendChild(overlay);

    this.overlayElement = overlay;

    body.setAttribute('style', 'overflow: hidden;');

    this.overlayElement.addEventListener('click', (event) => this.closeOnClick(event));
    body.addEventListener('keydown', (event) => this.closeOnPressEscape(event));
  }

  detachOverlay() {
    this.detachChild();
    const body = document.body;

    this.overlayElement.remove();

    body.setAttribute('style', 'overflow: auto;');

    this.overlayElement.removeEventListener('click', (event) => this.closeOnClick(event));
    body.removeEventListener('keydown', (event) => this.closeOnPressEscape(event));
  }

  closeOnClick(event: MouseEvent) {
    if (event.srcElement && (event.srcElement === this.overlayElement)) {
      this.closeOverlay();

      event.preventDefault();
      return false;
    }
  }

  closeOnPressEscape(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.closeOverlay();

      event.preventDefault();
      return false;
    }

  }
}

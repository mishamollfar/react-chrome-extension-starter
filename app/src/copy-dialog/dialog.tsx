import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Overlay } from '../overlay/overlay';
import { ContentComponent } from './component/content-component';


export class Dialog {
  resolve: any;
  reject: any;

  static create() {
    const overlay = Overlay.create();
    return new Dialog(overlay).promise();
  }

  constructor(private overlay: Overlay) {
    this.createBox();
  }

  promise(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  createBox() {
    const box = document.createElement('div');
    box.classList.add('extension-container');
    box.setAttribute('id', 'extensionContainer');
    box.setAttribute('style', 'width: auto; max-width: 600px; height: auto; min-height: 200px;');

    this.overlay.attachChild(box);

    const actionEvent = (postParams) => {
      if (postParams) {
        this.resolve(postParams);
      } else {
        this.reject(new Error('Error selected group'))
      }
    };

    ReactDOM.render(
      <ContentComponent overla={this.overlay} onAction={actionEvent}/>,
      document.getElementById('extensionContainer')
    );
  }
}


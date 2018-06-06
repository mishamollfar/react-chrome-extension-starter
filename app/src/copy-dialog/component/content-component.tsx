import * as React from 'react';

import ShadowDOM from 'react-shadow';
import { Overlay } from '../../overlay/overlay';

const url = chrome.extension.getURL('./main.css');

export interface ContentComponentProps {
  overla: Overlay;
  onAction
}

export interface ContentComponentState {
  text: string;
}

export class ContentComponent extends React.Component<ContentComponentProps, ContentComponentState> {
  state = {text: ''};

  cancel = () => {
    if (!this.props.overla.closed) {
      this.props.overla.closeOverlay();
    }
  };

  save = () => {
    this.cancel();
  };


  render() {
    return (
      <ShadowDOM include={url}>
        <div className='content'>
          <p>Text your plugin</p>
          <button className='cancel-btn' onClick={this.cancel}>Отмена</button>
          <button className='save-btn' onClick={this.save}>Сохранить</button>
        </div>
      </ShadowDOM>
    );
  }
}

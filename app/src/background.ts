'use strict';

chrome.runtime.onInstalled.addListener(details => {
  chrome.storage.sync.set({'storage_current_date': {ms: '', photo: []}});

  chrome.contextMenus.create({
    'title': 'Action context menu',
    'contexts': ['all'],
    'onclick': (info) => {
      if (info) {
        chrome.storage.sync.get('storage_current_date', (data) => {
          if (info.selectionText) {
            data['storage_current_date_item'].ms += ' ' + info.selectionText;
          }

          if (info.srcUrl) {
            if (data['storage_current_date_item']['photo'].length < 10) {
              data['storage_current_date_item'].photo.push(info.srcUrl);
            }
          }
          chrome.storage.sync.set({
            'storage_current_date_item': {
              ms: data['storage_current_date_item'].ms,
              photo: data['storage_current_date_item'].photo
            }
          });
        });
      }
      sendingMessage();
    }
  });
});

chrome.browserAction.onClicked.addListener(() => {
  sendingMessage();
});

function sendingMessage() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: 'call_to_new_action'}, () => {
    });
  });
}

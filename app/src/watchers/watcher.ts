import { OpenDialog } from '../copy-dialog/open-dialog';

chrome.runtime.onMessage.addListener(async(request) => {
  if (request.greeting === 'call_to_new_action') {
    OpenDialog();
  }
});

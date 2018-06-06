export class StorageApi {
  constructor() {
  }

  getStorageKey = (key): Promise<string[]> => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (data) => {
        resolve(data[key]);
      });
    });
  };
}
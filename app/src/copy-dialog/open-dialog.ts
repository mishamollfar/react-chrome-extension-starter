import { Dialog } from './dialog';


export function OpenDialog() {
  const save = (data) => {
    console.log('save', data);
  };

  Dialog.create()
    .then(res => {
      return save(res)
    })
    .catch(error => {
      console.log(error);
    });
}

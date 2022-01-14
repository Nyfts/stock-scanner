import notifier from 'node-notifier';
import open from 'open';

export default function notify(title, url) {
  notifier.notify({
    title: title,
    message: 'Estoque encontrado!',
    icon: 'D:\\Repos\\ps5-stock-scanner\\src\\assets\\controle_ps5.jpg'
  },
  function (err, response, metadata) {
    open(url);
  });
}
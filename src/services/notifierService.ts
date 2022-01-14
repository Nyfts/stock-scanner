import notifier from 'node-notifier';
import open from 'open';

export default class NofitierService {
  static notify(title: string, url: string) {
    notifier.notify(
      {
        title: title,
        message: 'Estoque encontrado!',
        icon: 'D:\\Repos\\ps5-stock-scanner\\src\\assets\\controle_ps5.jpg'
      },
      function () {
        open(url);
      }
    );
  }
}

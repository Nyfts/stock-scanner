import notifier from 'node-notifier';
import open from 'open';
import productInfos from '../models/ProductInfo';

export default class NofitierService {
  static notify(product: productInfos) {
    notifier.notify(
      {
        title: product.title,
        message: 'Estoque encontrado!',
        icon: 'D:\\Repos\\ps5-stock-scanner\\src\\assets\\controle_ps5.jpg'
      },
      function () {
        open(product.url);
      }
    );
  }
}

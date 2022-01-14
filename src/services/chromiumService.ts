import puppeteer from 'puppeteer';
import ProductInfo from '../models/ProductInfo';

export default class ChromiumService {
  static async getProductInfo(url: string): Promise<ProductInfo | void> {
    try {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();

      await page.goto(url, {
        waitUntil: 'domcontentloaded'
      });

      console.log(await page.title());

      const productInfo: ProductInfo = await page.evaluate(() => {
        return {
          title: '',
          url: '',
          hasStock: true,
          value: 0
          // productTitle: document.querySelector('#productTitle')?.innerText,
          // availability: document.querySelector('#availability > span')?.innerText
        };
      });

      if (productInfo.title === undefined) {
        console.log(new Date().toLocaleString() + ' - Amazon\nPediu captcha :(\n');
        page.screenshot({ path: './src/assets/screenshot.png' });
      } else {
        console.log(
          new Date().toLocaleString() + ' - Amazon\nTitulo: ' + productInfo.title + '\nEstoque: ' + productInfo.hasStock + '\n' + productInfo.url + '\n'
        );
      }

      browser.close();
      return productInfo;
    } catch (ex: any) {
      console.error(ex);
    }
  }
}

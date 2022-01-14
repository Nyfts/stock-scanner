import interval from 'interval-promise';
import puppeteer from 'puppeteer';
import notify from './notifier.js';

async function main() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const sites = [
      'https://www.amazon.com.br/dp/B09FGC9T19/?coliid=IVR4L868YGGO7&colid=J5NBGNCZN5SZ&psc=0&ref_=lv_ov_lig_dp_it',
      'https://www.amazon.com.br/dp/B09FGCKBPK/?coliid=IORAYW3G6X6FW&colid=J5NBGNCZN5SZ&psc=0&ref_=lv_ov_lig_dp_it',
      'https://www.amazon.com.br/PlayStation-Controle-5-DualSense/dp/B088GNW267/ref=pd_sbs_1/146-5345312-5881254?pd_rd_w=2QXA1&pf_rd_p=9175a6cb-27e9-4c8e-b27e-0da5a40be6eb&pf_rd_r=0E7W61EK3BAEQXZJ8KGH&pd_rd_r=bb4cc4d7-3aea-41fc-b0ef-f0de6cd6a58f&pd_rd_wg=5heST&pd_rd_i=B088GNW267&psc=1'
    ]

    for (const site of sites) {
      await page.goto(site, {
        waitUntil: 'domcontentloaded'
      });
      console.log(await page.title());

      const pageContent = await page.evaluate(() => {
        return {
          productTitle: document.querySelector('#productTitle')?.innerText,
          availability: document.querySelector('#availability > span')?.innerText,
        };
      });

      console.log(pageContent.title)

      if (pageContent.title === undefined) {
        console.log(new Date().toLocaleString() + ' - Amazon\nPediu captcha :(\n');
        page.screenshot({path: './src/assets/screenshot.png'})
      } else {
        console.log(new Date().toLocaleString() + ' - Amazon\nTitulo: ' + pageContent.productTitle + '\nEstoque: ' + pageContent.availability + '\n' + site + '\n');

        if (pageContent.availability !== 'Não disponível.') {
          notify(pageContent.productTitle, site);
        }
      }
    }

    await browser.close();
  } catch (error) {
    console.log(error);
  }
}
interval(async () => {
  await main();
}, 3000);

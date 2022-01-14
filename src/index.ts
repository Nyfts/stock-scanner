import NofitierService from './services/notifier.service';
import ProductService from './services/product.service';
import ChromiumService from './services/chromium.service';

async function main() {
  const products = ProductService.listAllProducts();

  for (const product of products) {
    const productInfo = await ChromiumService.getProductInfo(product.url);

    if (productInfo?.hasStock) {
      NofitierService.notify(productInfo);
    }
  }
}

main();

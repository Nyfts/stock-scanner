import Product from './models/product';
import NofitierService from './services/notifierService';
import ProductService from './services/productService';
import ChromiumService from './services/chromiumService';

async function main() {
  const products: Product[] = ProductService.listAllProducts();

  for (const product of products) {
    const productInfo = await ChromiumService.getProductInfo(product.url);

    if (productInfo?.hasStock) {
      NofitierService.notify(productInfo);
    }
  }
}

main();

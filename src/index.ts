import Product from './models/product';
import NofitierService from './services/notifierService';
import ProductService from './services/productService';

const products: Product[] = ProductService.listAllProducts();

for (const product of products) {
  console.log(product.title);
  console.log(product.url);

  NofitierService.notify(product.title, product.url);
}

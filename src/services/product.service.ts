import Product from '../models/product';

export default class ProductService {
  static listAllProducts(): Product[] {
    return require('../../data/ps5.json');
  }
}

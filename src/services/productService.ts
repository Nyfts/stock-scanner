import Product from '../models/product';
import ps from '../data/ps5.json';

export default class ProductService {
  static listAllProducts(): Product[] {
    return ps;
  }
}

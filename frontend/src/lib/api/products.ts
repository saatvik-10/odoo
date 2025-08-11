import {
  CreateProduct,
  UpdateProduct,
  Product,
} from '@/validators/product.validator';
import { Axios } from 'axios';

export class Products {
  axios: Axios;

  constructor(axios: Axios) {
    this.axios = axios;
  }

  async getProducts(): Promise<Product[]> {
    const { data: res } = await this.axios.get('/products');
    return res;
  }

  async getProductsByVendorId(vendorId: string): Promise<Product[]> {
    const { data: res } = await this.axios.get(`/products/vendor/${vendorId}`);
    return res;
  }

  async getProductById(productId: string): Promise<Product> {
    const { data: res } = await this.axios.get(`/product/${productId}`);
    return res;
  }

  async createProduct(data: CreateProduct): Promise<Product> {
    const { data: res } = await this.axios.post('/product', data);
    return res;
  }

  async updateProduct(
    productId: string,
    data: UpdateProduct
  ): Promise<Product> {
    const { data: res } = await this.axios.put(`/product/${productId}`, data);
    return res;
  }

  async updateProductPublic(
    productId: string,
    isPublic: boolean
  ): Promise<Product> {
    const { data: res } = await this.axios.patch(
      `/product/${productId}/public`,
      {
        public: isPublic,
      }
    );
    return res;
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.axios.delete(`/product/${productId}`);
  }
}

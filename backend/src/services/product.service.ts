import ProductModel from "@/models/product.model";
import type {
  CreateProduct,
  Product,
  UpdateProduct,
} from "@/validators/product.validator";

export class ProductService {
  async getProducts() {
    return await ProductModel.find({});
  }

  async getProductsByVendorId(id: string) {
    return await ProductModel.find({ vendor: id });
  }

  async getProductById(id: string) {
    return ProductModel.findById(id);
  }

  async createProduct(vendor: string, product: CreateProduct) {
    await ProductModel.create({
      ...product,
      vendor,
    });
  }

  async updateProduct(id: string, product: UpdateProduct) {
    await ProductModel.findByIdAndUpdate(id, {
      $set: product,
    });
  }

  async updateProductPublic(id: string, isPublic: boolean) {
    await ProductModel.findByIdAndUpdate(id, {
      $set: { public: isPublic },
    });
  }

  async deleteProduct(id: string) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

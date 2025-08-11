import { ProductController } from "@/controllers/product.controller";
import { authenticate } from "@/middlewares/auth";
import { vendorAuthenticate } from "@/middlewares/vendor.middleware";
import { Hono } from "hono";

const productController = new ProductController();

const app = new Hono();

app.get("/", productController.getProducts);
app.get("/vendor/:id", productController.getProductsByVendorId);
app.get("/:id", productController.getProductById);
app.post(
  "/",
  authenticate,
  vendorAuthenticate,
  productController.createProduct
);
app.put(
  "/:id",
  authenticate,
  vendorAuthenticate,
  productController.updateProduct
);
app.patch(
  "/:id/public",
  authenticate,
  vendorAuthenticate,
  productController.updateProductPublic
);
app.delete(
  "/:id",
  authenticate,
  vendorAuthenticate,
  productController.deleteProduct
);

export default app;

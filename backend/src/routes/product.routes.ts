import { ProductController } from "@/controllers/product.controller";
import { Hono } from "hono";

const productController = new ProductController();

const app = new Hono();

app.get("/products", productController.getProducts);
app.get("/products/vendor/:id", productController.getProductsByVendorId);
app.get("/product/:id", productController.getProductById);
app.post("/product", productController.createProduct);
app.put("/product/:id", productController.updateProduct);
app.patch("/product/:id/public", productController.updateProductPublic);
app.delete("/product/:id", productController.deleteProduct);

export default app;

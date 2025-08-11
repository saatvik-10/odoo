import { Hono } from "hono";
import { cors } from "hono/cors";
import { StatusCodes } from "http-status-codes";
import exampleRoutes from "@/routes/example.routes";
import couponRoutes from "@/routes/coupon.routes";
import authRoutes from "@/routes/auth.routes";
import vendorRoutes from "@/routes/vendor.routes";
import userRoutes from "@/routes/user.routes";
import transferRoutes from "@/routes/transfer.routes";
import productRoutes from "@/routes/product.routes"
import adminRoutes from "@/routes/admin.routes";
import { logger } from "hono/logger";
import { connectDB } from "./utils/db";


// Connect to MongoDB
await connectDB(process.env.MONGO_URI as string);

// Initialize Hono app
const app = new Hono();

//logger
app.use(logger());

// CORS Middleware
app.use(cors());

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", service: "Rentals-Backend" });
});

// API Routes
const apiRoutes = new Hono();
apiRoutes.route("/user", userRoutes);
apiRoutes.route("/example", exampleRoutes);
apiRoutes.route("/coupon", couponRoutes);
apiRoutes.route("/auth", authRoutes);
apiRoutes.route("/transfer", transferRoutes)
apiRoutes.route("/vendor",vendorRoutes);
apiroutes.route("/product", productRoutes)
apiRoutes.route("/admin",adminRoutes)

// Mount API routes
app.route("/api", apiRoutes);

// 404 Handler
app.notFound((c) => {
  return c.json({ error: "Not Found" }, StatusCodes.NOT_FOUND);
});

// Error Handler
app.onError((err, c) => {
  console.error("Error:", err);
  return c.json(
    { error: "Internal Server Error" },
    StatusCodes.INTERNAL_SERVER_ERROR
  );
});

// Export the app
const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 5000;

console.log(`Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
  idleTimeout: 0, // Disable idle timeout
};

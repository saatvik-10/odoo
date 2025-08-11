import { TransferController } from "@/controllers/transfer.controller";
import { authenticate } from "@/middlewares/auth";
import { Hono } from "hono";

const transferController = new TransferController();

const app = new Hono()

app.post("/transfer", authenticate, transferController.createTransfer);
app.get("/transfer/:id", authenticate, transferController.getTransferByID);
app.get("/transfer/rental/:id", authenticate, transferController.getTransferByRentalID);
app.get("/transfer/user/:id", authenticate, transferController.getTransferByUserID);
app.get("/transfer/vendor/:id", authenticate, transferController.getTransferByVendorID);
app.put("/transfer/:id", authenticate, transferController.updateTransferByID);
app.put("/transfer/:id/status", authenticate, transferController.updateTransferStatus);


export default app;

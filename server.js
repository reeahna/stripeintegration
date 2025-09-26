// server.js
import express from "express";
import paymentsRoute from "./routes/payments.js";
import subscriptionsRoute from "./routes/subscriptions.js";
import webhooksRoute from "./routes/webhooks.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use("/webhook", express.raw({ type: "application/json" }), webhooksRoute);

// JSON parser for all other routes
app.use(express.json());

// API routes
app.use("/api/payments", paymentsRoute);
app.use("/api/subscriptions", subscriptionsRoute);

// Static frontend
app.use(express.static("public"));

// Publishable key endpoint
app.get("/config", (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.listen(process.env.PORT || 4242, () => {
  console.log("🚀 Server running on http://localhost:4242");
});

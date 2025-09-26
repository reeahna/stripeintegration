// routes/webhooks.js
import express from "express";
import stripe from "../config/stripe.js";

const router = express.Router();

// Webhook endpoint (raw body is applied in server.js)
router.post("/", (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,                    // raw Buffer from express.raw
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return res.sendStatus(400);
  }

  // Handle events
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("✅ One-time payment succeeded:", paymentIntent.id);
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object;
      console.log("✅ Subscription payment succeeded:", invoice.id);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.log("❌ Subscription payment failed:", invoice.id);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      console.log("🛑 Subscription canceled:", subscription.id);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

export default router;

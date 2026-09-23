import { Hono } from 'hono' 
import Stripe from 'stripe'

const router = new Hono()

router.post("/webhook", async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);

  const signature = c.req.header("stripe-signature");

  if (!signature) {
    return c.text("Missing stripe-signature", 400);
  }

  const body = await c.req.text();

  try {
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      c.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("Stripe event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("PURCHASE COMPLETED!");
      console.log("Session ID:", session.id);
      console.log("Customer:", session.customer);
      console.log("Amount:", session.amount_total);
    }

    return c.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return c.text("Webhook Error", 400);
  }
});

export default router

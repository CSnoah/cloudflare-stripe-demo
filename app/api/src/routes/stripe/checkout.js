import { Hono } from 'hono'
import Stripe from 'stripe'

const router = new Hono()

router.post("/create-checkout-session", async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_creation: "always",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Test Product",
            images: [
              "https://free-images.com/lg/464d/digital_equipment_t_shirt.jpg"
            ],
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],

    success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:5173/cancel",
  });

  return c.json({
    url: session.url,
  });
});

router.get("/checkout-session/:sessionId", async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);

  const sessionId = c.req.param("sessionId");

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return c.json(session);
});

export default router

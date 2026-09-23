// import { Hono } from 'hono'
//
// const app = new Hono()
//
// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })
//
// export default app

import { Hono } from "hono";
// import Stripe from "stripe";
import stripeWebhooks from './routes/stripe/webhooks.js'
import stripeCheckout from './routes/stripe/checkout.js'

// type Bindings = {
//   STRIPE_SECRET_KEY: string;
// };

// const app = new Hono<{ Bindings: Bindings }>();

const app = new Hono()

app.route('/api/session', stripeCheckout)
app.route('/api/stripe', stripeWebhooks)

export default app;

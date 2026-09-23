# Stripe Test App

A minimal Stripe Checkout test application built with:

* **React + Vite** — frontend
* **Hono** — API
* **Cloudflare Workers** — backend/runtime
* **Stripe Checkout** — payment page

The purpose of this project is to understand the basic Stripe payment flow before building a more complete payment system.

## Project Structure

```text
app/
├── api/
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   ├── wrangler.jsonc
│   └── .dev.vars
│
└── web/
    ├── src/
    │   ├── App.jsx
    │   └── ...
    ├── package.json
    └── vite.config.js
```

---

## Setup

### 1. Install dependencies

Install the dependencies for both applications.

```bash
cd api
npm install

cd ../web
npm install
```

### 2. Get the Stripe Secret Key

Go to the **Stripe Dashboard** and open the API keys section.

For this test project, use the **test/sandbox secret key**.

The key will look something like:

```text
sk_test_...
```

Do not put this key in your React code or commit it to Git.

### 3. Add the Stripe Secret Key

Create:

```text
api/.dev.vars
```

Add:

```env
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### 4. Add webhook key

Before starting the application, you need to start Stripe's local webhook listener and add its webhook signing secret to .dev.vars.

1. Start the Stripe webhook listener

cd api
stripe listen --forward-to localhost:5173/api/webhook

Copy the whsec_... value.

2. Add the webhook secret to .dev.vars

In: api/.dev.vars
add:
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

The secret key is used to authenticate your API requests to Stripe.
The webhook secret is used to verify that incoming webhook events came from Stripe.

---

## Run the Application

From the web directory:

cd ../web
npm run dev

The Vite development server uses the Cloudflare Vite plugin to start the Cloudflare Worker alongside the React development server.

This means the React frontend and Hono API are available through the same development server.

Open: http://localhost:5173

---

### You should have two terminal processes running:

Terminal 1 — Stripe CLI

cd api
stripe listen --forward-to localhost:5173/api/webhook

Terminal 2 — Vite + Cloudflare Worker

cd web
npm run dev

---

## Current Goals

- The goal is to start with the smallest possible Stripe integration
- Once this basic flow is understood, additional Stripe concepts can be added one at a time
  
working on including:

* User accounts
* Customers stored in Stripe
* Orders
* A database
* Webhooks
* Payment confirmation in your database
* Idempotency
* Shipping
* Refund handling
* Email receipts
* Stripe Products/Prices stored in Stripe
* Production deployment

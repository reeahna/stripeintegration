# Stripe Integration (Test Mode Starter)

## Repository Overview

This repository provides a minimal, test-mode Stripe integration using **Express** and the **Payment Element**. It demonstrates both one-time payments and subscription flows with webhooks enabled for event handling.

### Structure

* **server.js** — Entry point, Express setup
* **config/stripe.js** — Stripe client initialization
* **routes/**

  * **payments.js** — One-time payment (PaymentIntent)
  * **subscriptions.js** — Subscription creation
  * **webhooks.js** — Webhook endpoint
* **public/** — Static demo pages (checkout, subscription, success screens)

---

## Tech Stack

* **Node.js** (v18+)
* **Express** (web framework)
* **Stripe Node SDK** (payments API)
* **dotenv** (environment configuration)

---

## Setup

### Prerequisites

* Node.js v18+
* Stripe account with test keys
* Stripe CLI (optional, for local webhook testing)

### Installation

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root:

```dotenv
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PORT=4242
```

### Development Workflow

1. Clone the repository
2. Run `npm install`
3. Add `.env` file with your Stripe test keys
4. Start the server with `npm start`
5. Open `http://localhost:4242/checkout.html` or `http://localhost:4242/subscriptions.html`

---

## Scripts

Defined in `package.json`:

* **start** — `node server.js` (launches server)
* **test** — placeholder script

Run with:

```bash
npm start
```

---

## Usage

### Endpoints

* **GET /config** — Returns publishable key
* **POST /api/payments/create-payment-intent** — Creates PaymentIntent (one-time)
* **POST /api/subscriptions/create-subscription** — Creates subscription and returns client secret
* **POST /webhook** — Handles Stripe events

### Static Pages

* **/checkout.html** — One-time payment example
* **/subscriptions.html** — Subscription example
* **/checkout-success.html** — One-time success redirect
* **/subscription-success.html** — Subscription success redirect

---

## Webhooks

Run Stripe CLI to forward events locally:

```bash
stripe listen --forward-to localhost:4242/webhook
```

The handler currently logs these events:

* `payment_intent.succeeded`
* `invoice.payment_succeeded`
* `invoice.payment_failed`
* `customer.subscription.deleted`

---

## Payment Flow

### One-Time Payment

1. Client fetches publishable key from `/config`
2. Client calls `/api/payments/create-payment-intent`
3. Stripe Elements mounts Payment Element
4. `stripe.confirmPayment` handles confirmation and redirect

### Subscription

1. Client fetches publishable key from `/config`
2. Client calls `/api/subscriptions/create-subscription`
3. Stripe Elements mounts Payment Element
4. `stripe.confirmPayment` handles confirmation and redirect

---

## Notes

* Integration is configured for **test mode only**.
* Environment variables are required for keys and webhook secret.
* Static demo HTML is provided; adapt to your production frontend as needed.
* Webhook route requires raw body for signature verification.

---

## License

ISC (default, from package.json).

import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { buffer } from 'micro';

const stripe = require('stripe')(process.env.STRIPE_SK);

const endpointSecret =
  'whsec_328221fa5a20a8c4e0f17a7f8b1589e53a9275a93ca9d7aa6453b2dd611e6cd6';

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true
        });
      }
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: { bodyParser: false }
};

// champ-heaven-heal-gaily
// acct_1NOIAyGNKwSTulwu

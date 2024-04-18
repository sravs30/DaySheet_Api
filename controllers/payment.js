import Stripe from 'stripe';
const stripe = new Stripe(
    'sk_test_51OjN9XFNhsj1iBi0wwfql0Vc2R4xFed6ucysH1CFuHY952vYSeYgizZ6Zw7LL3xpjQO426eMnofXzcWkT2dLJCpw003lwTt5Rz'
  );

export const createintents = async (req, res, next) => {
    try {
        // create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
          currency: 'GBP',
          setup_future_usage: 'off_session',
          automatic_payment_methods: {
            enabled: true,
          },
        });
        // Return the secret
        res.json({  paymentIntentId: paymentIntent.id, paymentIntent: paymentIntent.client_secret });
      } catch (e) {
        res.status(400).json({
          error: e.message,
        });
      }
  };
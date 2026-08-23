import Stripe from "stripe";
import bookingModel from "../models/bookingModel.js";
import { createBookingService } from "../services/bookingService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function transitPayment(req, res) {
  try {
    const data = req.body;
    const response = await createBookingService(data);
    const id = response[0].id;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: id,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${data.from} --> ${data.to} via ${data.vehicleNo}`,
            },
            unit_amount: Math.round((data.ticketPrice / 288.5337) * 100),
          },
          quantity: data.noOfSeatsBooked,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}`,
      cancel_url: `${process.env.FRONTEND_URL}/booking`,
    });
    res.status(200).json({
      success: true,
      session,
      url: session.url,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      err,
    });
  }
}

export async function stripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_KEY,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log(event.type);
  const session = event.data.object;
  console.log(session.client_reference_id);
  switch (event.type) {
    case "checkout.session.completed":
      await bookingModel.findByIdAndUpdate(session.client_reference_id, {
        status: "paid",
      });
      break;
    case "checkout.session.expired":
      await bookingModel.findByIdAndDelete(session.client_reference_id);
      break;
  }

  res.json({ received: true });
}

import Stripe from "stripe";
import bookingModel from "../models/bookingModel.js";
import { createBookingService } from "../services/bookingService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function transitPayment(req, res) {
  try {
    const data = req.body;
    const response = await createBookingService(data);
    console.log(response);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            client_reference_id: data._id,
            product_data: {
              name: `${data.from} --> ${data.to} via ${data.vehicleNo}`,
            },
            unit_amount: Math.round((data.ticketPrice / 288.5337) * 100),
          },
          quantity: data.noOfSeatsBooked,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}`,
      cancel_url: `${process.env.FRONTEND_URL}/booking?name=muzammil`,
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
  console.log("Hook run!!");
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_KEY,
    );
    console.log(event);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  const session = event.data.object;
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

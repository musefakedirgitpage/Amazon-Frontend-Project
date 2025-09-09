const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
setGlobalOptions({maxInstances:10})
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "sucsses",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    console.log("payment resived", total);
    // res.send(total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);
    res.status(201).json({
      client_secret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});
exports.api = onRequest(app);


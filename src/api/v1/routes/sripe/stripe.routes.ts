import express from "express";
import { stripePayment } from "../../../../service/stripe/stripe.service";
import { ValidatePayment } from "../../../../service/stripe/weebhooks.service";

const router = express.Router();

router.route("/create-checkout-session").post(stripePayment);
router.route("/webhook").post(ValidatePayment);

module.exports = router;

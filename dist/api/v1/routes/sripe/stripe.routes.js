"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_service_1 = require("../../../../service/stripe/stripe.service");
const weebhooks_service_1 = require("../../../../service/stripe/weebhooks.service");
const router = express_1.default.Router();
router.route("/create-checkout-session").post(stripe_service_1.stripePayment);
router.route("/webhook").post(weebhooks_service_1.ValidatePayment);
module.exports = router;

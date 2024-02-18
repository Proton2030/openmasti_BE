"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripePayment = void 0;
// checkout api
const stripe = require('stripe')('sk_test_51ONCPxSCyxdPDARLxZDH1IIxXw79a1snd1rrptJ44tUpgHtdoOxtnlrvuyoGQlJbUr2kS184hvIMZqDwN5YNTp7100ERJdX1vt');
// Sample dummy data for testing
const dummyProducts = [
    {
        plan_name: "Sample Plan 1",
        price: "900"
    }
];
const stripePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield stripe.customers.create({
            metadata: {
                userId: "userTest",
                products: JSON.stringify(Array.isArray(req.body.products) ? req.body.products : dummyProducts)
            }
        });
        const products = Array.isArray(req.body.products) ? req.body.products : dummyProducts;
        if (!products.every((product) => typeof product === 'object')) {
            console.error("Invalid product data received.");
            return res.status(400).send("Bad Request");
        }
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.plan_name,
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: 1,
        }));
        if (lineItems.length === 0) {
            console.error("No line items provided.");
            return res.status(400).send("Bad Request");
        }
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            customer: customer.id,
            mode: "payment",
            success_url: "http://localhost:8080/employer/success",
            cancel_url: "http://localhost:8080/employer/cancel",
        });
        res.status(201).json(session);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.stripePayment = stripePayment;

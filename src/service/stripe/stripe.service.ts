import { Response, Request } from "express";
import mongoose from "mongoose";
import PlanDeatilsModel from "../../models/PlanDetails.model";

// checkout api
const stripe = require('stripe')('sk_test_51ONCPxSCyxdPDARLxZDH1IIxXw79a1snd1rrptJ44tUpgHtdoOxtnlrvuyoGQlJbUr2kS184hvIMZqDwN5YNTp7100ERJdX1vt');

// Sample dummy data for testing
const dummyProducts = [
  {
    plan_name: "Sample Plan 1",
    price: "900"
  }
];

export const stripePayment = async (req: Request, res: Response) => {
	try {
		const customer = await stripe.customers.create({
			metadata: {
				userId: "userTest",
				products: JSON.stringify(Array.isArray(req.body.products) ? req.body.products : dummyProducts)
			}
		})
		
		
		const products = Array.isArray(req.body.products) ? req.body.products : dummyProducts;

		if (!products.every((product: any) => typeof product === 'object')) {
			console.error("Invalid product data received.");
			return res.status(400).send("Bad Request");
		}

		const lineItems = products.map((product: { plan_name: any; price: number; }) => ({
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

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			customer:customer.id,
			mode: "payment",
			success_url: "http://localhost:8080/employer/success",
			cancel_url: "http://localhost:8080/employer/cancel",
		});
		
		res.status(201).json(session);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}

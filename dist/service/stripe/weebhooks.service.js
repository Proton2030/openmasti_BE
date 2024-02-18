"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePayment = void 0;
const ValidatePayment = (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    let data = request.body.data.object;
    let eventType = request.body.type;
    switch (eventType) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = data;
            console.log(paymentIntentSucceeded);
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        case 'checkout.session.completed':
            const paymentIntentValidate = data;
            console.log(paymentIntentValidate);
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${eventType}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
};
exports.ValidatePayment = ValidatePayment;

import { Controller, Post, BodyParams } from "@tsed/common";

@Controller("/cardwebhook")
export class StripeWebhookController {
  @Post("/")
  async handleWebhook(@BodyParams() event: any): Promise<any> {
    try {
      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntentSucess = event.data.object;
          console.log("Payment Successful")
          break;
        case "payment_intent.payment_failed":
          const paymentIntentFail = event.data.object;
          console.log("Payment Failed")
          break;
        case "payment_intent.created":
          const paymentTest = event.data.object;
          console.log("Payment Webhook test success")
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a response to acknowledge receipt of the event
      return { received: true };
    } catch (error) {
      // Handle any errors that occur during webhook processing
      console.error("Webhook processing error:", error);
      throw error;
    }
  }
}

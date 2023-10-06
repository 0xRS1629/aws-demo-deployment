import { Controller, Req, Post } from "@tsed/common";
import { Request } from "express"; // Import the Express Request type
import { Webhook } from "coinbase-commerce-node";

declare module "express" {
  interface Request {
    rawBody?: string; // Define the custom rawBody property
  }
}

const webhookSecret = process.env.COINBASE_WEBHOOK_SECRET || "";

@Controller("/coinbase-webhook")
export class CoinbaseWebhookController {
  @Post("/")
  async handleWebhook(@Req() request: Request): Promise<string> {
    const eventBody = request.rawBody as string;
    const signature = request.headers["x-cc-webhook-signature"] as string;

    try {
      const event = Webhook.verifyEventBody(eventBody, signature, webhookSecret);
      console.log("Webhook Event ID:", event.id);
      // Handle the webhook event here (e.g., process the payment)

      return "Webhook Received: " + event.id;
    } catch (error) {
      console.error("Webhook Verification Error:", error.message);
      throw new Error("Webhook Verification Error");
    }
  }
}

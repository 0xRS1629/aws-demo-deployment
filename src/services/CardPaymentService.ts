import { Configuration } from "@tsed/common";
import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import "@tsed/stripe";
import { Stripe } from "stripe";
import { PrintRequestModel } from "../models";

@Configuration({
  stripe: {
    apiKey: process.env.STRIPE_API_KEY || "",
    apiVersion: "2020-08-27"
  }
})
@Injectable()
export class CardPaymentService {
  @Inject(PrintRequestModel)
  model: MongooseModel<PrintRequestModel>;
  
  @Inject()
  stripe: Stripe;

  constructor() {};

  async createSession(tokenId: number): Promise<string> {
    const charge = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `token ${tokenId}`
            },
            unit_amount: 10.00
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `http://localhost:8083/success.html`,
      cancel_url: `http://localhost:8083/cancel.html`
    });

    return charge.url as string;
  }
}

import { Controller, Inject } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { Post } from "@tsed/schema";
import { CryptoPaymentService, CardPaymentService } from "../../services";

@Controller("/checkout")
export class PaymentController {
  @Inject() private cardPaymentService: CardPaymentService;
  @Inject() private cryptoPaymentService: CryptoPaymentService;

  @Post("/card/:tokenId")
  async createChekcoutSession(
    @PathParams("tokenId") tokenId: number
  ) {
    const paymentLink = await this.cardPaymentService.createSession(tokenId);
    return paymentLink;
  }

   @Post("/crypto/:tokenId")
   async createCharge(
     @PathParams("tokenId") tokenId: number
   ) {
     const paymentLink = await this.cryptoPaymentService.createCharge(tokenId,true);
     return paymentLink;
   }
}

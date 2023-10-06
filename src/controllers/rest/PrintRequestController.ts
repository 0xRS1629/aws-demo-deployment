import { Controller, Inject } from "@tsed/di";
import { PathParams, BodyParams } from "@tsed/platform-params";
// import { Get, Post, Put} from "@tsed/schema";
import { Post } from "@tsed/schema";
import { Use } from "@tsed/platform-middlewares";
import { Buyer, Shipping } from "../../types";
import { SignatureVerificationMiddleware } from "../../middlewares";
import { PrintRequestService } from "../../services";
@Controller("/requests")
export class PrintRequestController {
  @Inject() private service: PrintRequestService;

  @Post("/:tokenId")
  @Use(SignatureVerificationMiddleware)
  async createRequest(
    @PathParams("tokenId") tokenId: number,
    @BodyParams("walletAddress") walletAddress: string,
    @BodyParams("signedMessage") signedMessage: string,
    @BodyParams("originalMessage") originalMessage: string,
    @BodyParams("isAdmin") isAdmin: boolean,
    @BodyParams("buyer") buyer: Buyer,
    @BodyParams("shipping") shipping: Shipping
  ) {
    await this.service.createRequest(tokenId, buyer, shipping);

    return {
      message: "Request created"
    };
  }

  // @Get("/")
  // async getAllRequests(){
  //   // TODO
  //   // admin only
  // }

  // @Get("/:tokenId")
  // @Use(SignatureVerificationMiddleware)
  // async getRequest(
  //   @PathParams("tokenId") tokenId: number
  // ) {
  //   // TODO
  // }

  // @Get("/status/:tokenId")
  // async getStatus(
  //   @PathParams("tokenId") tokenId: number
  // ) {
  //   // TODO
  // }

  // @Put("/:tokenId")
  // @Use(SignatureVerificationMiddleware)
  // async updateRequest(
  //   @PathParams("tokenId") tokenId: number,
  //   @BodyParams("buyer") buyer: Buyer,
  //   @BodyParams("shipping") shipping: Shipping
  // ) {
  //   // TODO
  // }

}

import { Injectable, Inject } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { Buyer, Shipping } from "../types";
import { PrintRequestModel } from "../models";
import { BlockchainService, AddressValidationService } from "../utils";
import params from "../params.json";
@Injectable()
export class PrintRequestService {
  @Inject(PrintRequestModel)
  printRequestModel: MongooseModel<PrintRequestModel>;

  constructor(
    private blockchainService: BlockchainService,
    private addressValidationService: AddressValidationService
  ) {}

  async createRequest(tokenId: number, buyer: Buyer, shipping: Shipping) {
    const printReq = await this.printRequestModel.findOne({ tokenId: tokenId });

    if (
      printReq &&
      (printReq.buyer.walletAddress == buyer.walletAddress ||
        printReq.payment.method ||
        printReq.createdAt + params.requestValidity < Math.floor(Date.now() / 1000))
    ) {
      throw new Error("Request exists");
    } else {
      const isOwner = await this.blockchainService.verifyOwnership(tokenId, buyer.walletAddress);

      if (!isOwner) {
        throw new Error("Not owner");
      }

      const isAddressValid = await this.addressValidationService.validateAddress(shipping.address);

      if (!isAddressValid) {
        throw new Error("Invalid shipping address");
      }

      const price =
        shipping.address.country === params.domesticCode
          ? params.printCost + params.shippingCost.domestic
          : params.printCost + params.shippingCost.international;

      const newReq = new this.printRequestModel({
        tokenId: tokenId,
        buyer: buyer,
        shipping: shipping,
        price: price,
        createdAt: Math.floor(Date.now() / 1000)
      });

      await newReq.save();
    }
  }

  // async getRequest(tokenId: number) {
  //  //TODO
  // }

  /* async getStatus(tokenId: number) {
    // request = findRequest(tokenId)
    // if !request
    //   throw error "request doesn't exist"
    // else
    //   return {
    //     "method": request.payment.method,
    //     "status": request.payment.status,
    //   }
    const findTokenId = await this.printRequestModel.findOne({ tokenId: tokenId });
    if (!findTokenId) {
      throw new Error("TokenId doesn't exist");
    } else {
      return {
        method: findTokenId.payment.method,
        status: findTokenId.payment.status
      };
    }
  }
  */

  // async updateRequest(tokenId: number) {

  // }

  // async updatePaymentStatus(tokenId: number, payment: Payment) {
  //   // TODO
  // }
}

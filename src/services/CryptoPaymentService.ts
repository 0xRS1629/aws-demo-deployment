import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { PrintRequestModel } from "../models";
//import printRequest from "../models/PrintRequestModel";

@Injectable()
export class CryptoPaymentService {
  @Inject(PrintRequestModel)
  PrintRequestModel: MongooseModel<PrintRequestModel>;

  constructor() {}

  async createCharge(tokenId: number, shippingUSFlag: boolean): Promise<any> {
    try {
      const databaseData = await this.PrintRequestModel.findOne({tokenId:10});
      console.log(databaseData);
      const price = shippingUSFlag ? "5" : "10";
      const coinbaseAPIKey:string=process.env.COINBASE_API_KEY|| "";
      const apiUrl = "https://api.commerce.coinbase.com/charges"; 
      const coinbaseHeaders = new Headers();
      coinbaseHeaders.append("Content-Type", "application/json");
      coinbaseHeaders.append("Accept", "application/json");
      coinbaseHeaders.append("X-CC-Api-Key", coinbaseAPIKey);

      const requestData = {
        name: "test",
        description: "test description",
        pricing_type: "fixed_price",
        local_price: {
          amount: price,
          currency: "USD"
        }
      };

      const raw = JSON.stringify(requestData);

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: coinbaseHeaders,
        body: raw,
        redirect: 'follow'
      };

      const coinbaseChargeApiResponse = await fetch(apiUrl, requestOptions);

      if (!coinbaseChargeApiResponse.ok) {
        throw new Error(`Failed to post data to Coinbase API. Status: ${coinbaseChargeApiResponse.status}`);
      }
      const coinbaseData=await coinbaseChargeApiResponse.json()
      return coinbaseData.data.hosted_url as string;
    } catch (error) {
      console.error("Error posting data to Coinbase API:", error);
      throw error; 
    }
  }
}


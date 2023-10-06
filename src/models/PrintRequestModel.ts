import { Indexed, Model, ObjectID } from "@tsed/mongoose";
import { Property, Required } from "@tsed/schema";
import { Buyer, Shipping, Payment } from "../types";

@Model({ name: "printRequest", schemaOptions: { timestamps: true } })
export class PrintRequestModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Indexed()
  @Required()
  tokenId: number;

  @Property()
  @Required()
  buyer: Buyer;

  @Property()
  @Required()
  shipping: Shipping;

  @Property()
  price: number;

  @Property()
  createdAt: number;
  @Property()
  payment: Payment;
}


enum PaymentMethod {
  card = "card",
  crypto = "crypto"
}

export enum ShippingStatus {
  notRequested = "notRequested",
  inPrint = "inPrint",
  dispatched = "dispatched",
  delivered = "delivered"
}

enum CryptoPaymentStatus {
  newCharge = "newCharge",
  pending = "pending",
  completed = "completed",
  expired = "expired",
  unresolved = "unresolved",
  resolved = "resolved",
  cancelled = "cancelled",
  pendingRefund = "pendingRefund",
  refunded = "refunded"
}

enum CardPaymentStatus {
  paid = "paid",
  unpaid = "unpaid"
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Buyer {
  fullName: string;
  contactNo: number;
  email: string;
  walletAddress: string;
}

export interface Shipping {
  address: Address;
  status: ShippingStatus;
}

export interface Payment {
  method: PaymentMethod;
  link: string;
  status: CryptoPaymentStatus | CardPaymentStatus;
}

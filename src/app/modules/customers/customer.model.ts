
export interface ICustomerPurchase extends ICustomer {
  customer?: any;
  product?: any;
  customerId?: number;
  productId?: number;
}

export interface ICustomer {
  id?: number;
  name?: string;
}
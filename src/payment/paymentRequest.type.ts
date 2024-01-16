//  import { Product } from './Product';
export type product = {
  quantity:number,
  price:number
}
export type products = product[];

export interface PaymentRequestBody {
  products: products;
  currency: string;
  customerEmail:string;
}
import {  products } from "../paymentRequest.type"

export class CreatePaymentDto {
    products:products
    currency:string
    customerEmail:string
}

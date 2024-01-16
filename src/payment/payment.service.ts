import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import { PaymentRequestBody } from './paymentRequest.type';
import { UserService } from '../user/user.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async createCustomer(name: string, email: string) {
    try {
      return await this.stripe.customers.create({
        name,
        email,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    let amount = 0;
    paymentRequestBody.products.forEach((product) => {
      amount = amount + product.price * product.quantity;
    });
    const customerId = await this.stripe.customers.retrieve(
      paymentRequestBody.customerEmail,
    );
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId.id,
      payment_method:'src_1NH0reSCCsqp8wN9uLas153w',
      currency: process.env.STRIPE_CURRENCY,
      confirm: true,
    });
  }
}

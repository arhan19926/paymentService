import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PaymentService } from '../payment/payment.service';
import Stripe from 'stripe';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => PaymentModule)],
  controllers: [UserController],
  providers: [UserService,PaymentService,Stripe],
  exports:[UserService]
})
export class UserModule {}

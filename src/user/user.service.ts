import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => PaymentService))
    private stripeService: PaymentService,
    @InjectModel(User.name) private userRepository: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const stripeCustomer = await this.stripeService.createCustomer(
      createUserDto.name,
      createUserDto.email
    );

    const newUser = new this.userRepository({...createUserDto,stripeCustomerId:stripeCustomer.id});
    return newUser.save();
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({email:email})
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

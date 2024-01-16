import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class User {

    @Prop({default:false})
    isDeleted:boolean

    @Prop()
    name:string

    @Prop({unique:true})
    email:string

    @Prop()
    stripeCustomerId:string
}

export const UserSchema = SchemaFactory.createForClass(User);
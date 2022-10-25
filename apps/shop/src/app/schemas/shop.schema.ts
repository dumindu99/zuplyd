import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ShopDocument = Shop & Document;

@Schema()
export class Shop {

    @Prop()
    company_id: string;

    @Prop()
    location: string;

    @Prop()
    manager_id: string;

    @Prop()
    contact_no: string[];

    @Prop()
    address: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
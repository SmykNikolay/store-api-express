import mongoose, { Document, Schema } from 'mongoose';

interface IOrderItem {
  product_id: Schema.Types.ObjectId;
  quantity: number;
  price_per_item: number;
  size: string;
  color: string;
}

interface IShippingAddress {
  first_name: string;
  last_name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postal_code: string;
  country: string;
}

interface IOrder extends Document {
  user_id: Schema.Types.ObjectId;
  order_date: Date;
  status: string;
  total_amount: number;
  items: IOrderItem[];
  shipping_address: IShippingAddress;
}

const OrderSchema = new Schema<IOrder>({
  user_id: { type: Schema.Types.ObjectId, required: true },
  order_date: { type: Date, required: true },
  status: { type: String, required: true },
  total_amount: { type: Number, required: true },
  items: [
    {
      product_id: { type: Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
      price_per_item: { type: Number, required: true },
      size: { type: String, required: true },
      color: { type: String, required: true }
    }
  ],
  shipping_address: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address_line_1: { type: String, required: true },
    address_line_2: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true }
  }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

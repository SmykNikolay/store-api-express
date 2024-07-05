import mongose, { Document, Schema } from 'mongoose';
import validator from 'validator';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category_id: Schema.Types.ObjectId;
  stock: number;
  images: string[];
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30']
    },
    description: {
      type: String,
      required: [true, 'Поле "description" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "description" - 2'],
      maxlength: [100, 'Максимальная длина поля "description" - 100']
    },
    price: {
      type: Number,
      required: [true, 'Поле "price" должно быть заполнено']
    },
    category_id: {
      type: Schema.Types.ObjectId,
      required: [false, 'Поле "category_id" должно быть заполнено']
    },
    stock: {
      type: Number,
      required: [false, 'Поле "stock" должно быть заполнено']
    },
    images: {
      type: [String],
      required: [true, 'Поле "images" должно быть заполнено'],
      validate: {
        validator: (v: string[]) => v.every((i) => validator.isURL(i)),
        message: 'Некорректный URL'
      }
    }
  },
  {
    versionKey: false
  }
);

const Product = mongose.model<IProduct>('Product', productSchema);

export default Product;

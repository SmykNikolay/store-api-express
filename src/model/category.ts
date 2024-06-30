import mongoose, { Schema } from 'mongoose';

interface ICategory {
  name: string;
  description: string;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "description" - 2'],
    maxlength: [100, 'Максимальная длина поля "description" - 100'],
  },
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

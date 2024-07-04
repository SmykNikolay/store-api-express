// db.ts
import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from './utils/constants';

export async function connectToDb() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log('Подключение к MongoDB успешно установлено');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
  }
}

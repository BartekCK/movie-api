import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
dotenv.config();

const app: Express = express();
const PORT: number | string = process.env.PORT || 8080;

connectToDatabase();

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});

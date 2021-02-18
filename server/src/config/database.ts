import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, DATABASE, DATABASE_PORT, DATABASE_HOST } = process.env;

const databaseUrl: string = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE}`;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Successfully connected with database');
    } catch (e) {
        console.log(e);
    }
};

export { connectToDatabase };

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, DATABASE, DATABASE_PORT, DATABASE_HOST } = process.env;

const databaseUrl: string = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE}`;

const connectToDatabase = async (): Promise<void> => {
    await mongoose.connect(databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    console.log('Successfully connected with database');
};

const closeDbConnection = async (): Promise<void> => {
    await mongoose.connection.close();
};

export { connectToDatabase, closeDbConnection };

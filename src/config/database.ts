import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, DATABASE, DATABASE_PORT, DATABASE_HOST } = process.env;

const databaseUrl: string = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE}`;

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

const connectToDatabase = async (): Promise<void> => {
    if (process.env.NODE_ENV === 'test') {
        return;
    }
    await mongoose.connect(databaseUrl, dbOptions);
    console.log('Successfully connected with database');
};

export { connectToDatabase, dbOptions };

import mongoose from "mongoose";

mongoose.set('strictQuery', true);

let DB_URI = process.env.DATABASE_URL!;

if (!DB_URI) {
    throw new Error("Database Uri is missing");
}

export const DATABASE_CONNECTION = mongoose.createConnection(DB_URI, {
    maxConnecting: 10,
    bufferCommands: false
});
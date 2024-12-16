import { Model, Schema } from 'mongoose';
import { UserSchemaType } from '@/types/user';
import { DATABASE_CONNECTION } from '@/server/helpers/database';

const UserSchema = new Schema<UserSchemaType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: false
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
}, { collection: 'Users', timestamps: true, versionKey: false });

export const UserModel = DATABASE_CONNECTION.models.User as Model<UserSchemaType> ||
DATABASE_CONNECTION.model<UserSchemaType>('User', UserSchema);
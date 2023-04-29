import { Schema, model } from 'mongoose';

interface IUser {
    FirstName: string,
    LastName: string,
    UserName: string,
    AuthenticatedUrl: string,
    CreationData: Date
}

const UserSchema = new Schema<IUser>({
    FirstName: { type: String, required: true, unique: false },
    LastName: { type: String, required: true, unique: false },
    UserName: { type: String, required: true, unique: true },
    CreationData: { type: Date, required: true, unique: false },
    AuthenticatedUrl: { type: String, required: false, unique: false }
})


const Users = model<IUser>('Item', UserSchema)

export { Users, IUser }
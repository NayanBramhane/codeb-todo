import mongoose, { Schema, Model, Document } from 'mongoose';

// interface for User document
export interface IUser extends Document{
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// mongoose schema for User
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Exclude password from query results by default
    },
  },
  { timestamps: true },
);

// mongoose model for User
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

// export the User model
export default User;

import mongoose, { Model, Schema } from 'mongoose';

// interface for Todo document
export interface ITodo {
  title: string;
  description?: string;
  owner: mongoose.Types.ObjectId;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// mongoose schema for Todo
const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
    },
    // many to one relationship with User
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Compound index for efficient querying of user's todos sorted by creation date
todoSchema.index({ owner: 1, createdAt: -1 });

// mongoose model for Todo
const Todo: Model<ITodo> = mongoose.model<ITodo>('Todo', todoSchema);

// export the Todo model
export default Todo;

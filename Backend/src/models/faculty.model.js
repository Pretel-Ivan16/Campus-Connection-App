import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Faculty name is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Faculty name must be at least 3 characters long'],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;

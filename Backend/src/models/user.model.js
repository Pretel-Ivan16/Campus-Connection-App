import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // No incluir password por defecto en queries
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false, // No incluir token por defecto en queries
    },
    passwordResetToken: {
      type: String,
      select: false, // No incluir token por defecto en queries
    },
    passwordResetTokenExpiry: {
      type: Date,
      select: false, // No incluir expiry por defecto en queries
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

const User = mongoose.model('User', userSchema);

export default User;

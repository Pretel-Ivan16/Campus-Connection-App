import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      minlength: [3, 'Post title must be at least 3 characters long'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
      minlength: [10, 'Post content must be at least 10 characters long'],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post author is required'],
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
      required: [true, 'Post faculty is required'],
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

// Índices para búsquedas rápidas
postSchema.index({ authorId: 1 });
postSchema.index({ facultyId: 1 });
postSchema.index({ createdAt: -1 }); // Para ordenar por fecha más reciente

const Post = mongoose.model('Post', postSchema);

export default Post;

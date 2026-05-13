import mongoose from 'mongoose';
import { ENVIRONMENT } from '../config/environment.config.js';
import Faculty from '../models/faculty.model.js';
import Post from '../models/post.model.js';

const deletePostByTitle = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(ENVIRONMENT.mongodbUrl);
    console.log('MongoDB connected successfully');

    // Buscar la Facultad de Ingenierías
    const faculty = await Faculty.findOne({
      name: { $regex: 'Ingenier', $options: 'i' } // Case insensitive
    });

    if (!faculty) {
      console.log('❌ Facultad de Ingenierías no encontrada');
      process.exit(1);
    }

    console.log(`✅ Facultad encontrada: ${faculty.name} (ID: ${faculty._id})`);

    // Buscar el post "Post Actualizado" en esa facultad
    const post = await Post.findOne({
      title: 'Post Actualizado',
      facultyId: faculty._id
    });

    if (!post) {
      console.log('Post "Post Actualizado" no encontrado en esa facultad');
      process.exit(1);
    }

    console.log(`Post encontrado: "${post.title}" (ID: ${post._id})`);

    // Eliminar el post
    const deletedPost = await Post.deleteOne({ _id: post._id });

    if (deletedPost.deletedCount === 1) {
      console.log('Post eliminado correctamente');
    } else {
      console.log('Error al eliminar el post');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

deletePostByTitle();

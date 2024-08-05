require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const users = await User.insertMany([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ]);
    console.log('Users seeded:', users);

    const posts = await Post.insertMany([
      { title: 'First Post', content: 'This is my first post!', author: users[0]._id },
      { title: 'Second Post', content: 'Another interesting post.', author: users[1]._id },
    ]);
    console.log('Posts seeded:', posts);

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedDatabase();

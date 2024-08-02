// seeders/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');

const seedDatabase = async () => {
  console.log('Connecting to:', process.env.MONGO_URI); // Log the URI to ensure it is being read correctly
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const users = await User.insertMany([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ]);

  await Post.insertMany([
    { title: 'First Post', content: 'This is my first post!', author: users[0]._id },
    { title: 'Second Post', content: 'Another interesting post.', author: users[1]._id },
  ]);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDatabase();

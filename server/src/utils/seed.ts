import User from '../models/User.js';
import Todo from '../models/Todo.js';
import bcryptjs from 'bcryptjs';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    const todoCount = await Todo.countDocuments();

    // If data already exists → don't seed
    if (userCount > 0) {
      return;
    }

    console.log('Seeding database...');

    const hashedPassword = await bcryptjs.hash('12345678', 10);

    // Create 2 users
    const users = await User.insertMany([
      {
        email: 'nayan@gmail.com',
        password: hashedPassword,
      },
      {
        email: 'test@gmail.com',
        password: hashedPassword,
      },
    ]);

    // Create 6 todos for each user
    const todos = [];

    for (const user of users) {
      for (let i = 1; i <= 26; i++) {
        todos.push({
          title: `Todo ${i} for ${user.email}`,
          description: `Sample description ${i}`,
          owner: user._id,
          isCompleted: false,
        });
      }
    }

    await Todo.insertMany(todos);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

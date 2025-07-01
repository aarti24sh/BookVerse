const User = require("../models/User");
const Book = require("../models/Book");
const faker = require("@faker-js/faker").fakerEN_US;
const bcrypt = require("bcryptjs");
require("dotenv").config();

const testUserPassword = "TestPass123!"; 

const seed_db = async () => {
  try {
    await User.deleteMany({});
    await Book.deleteMany({});

    const hashedPassword = await bcrypt.hash(testUserPassword, 10);

    // Create test user manually
    const testUser = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: hashedPassword,
    });
    await testUser.save();

    
    // Create 10 books tied to testUser._id
    const books = [];
    const validStatuses = ['Want to Read', 'Reading', 'Finished'];
    for (let i = 0; i < 10; i++) {
      books.push(
        new Book({
          title: faker.lorem.words(3),
          author: faker.person.fullName(),
          status: validStatuses[Math.floor(Math.random() * validStatuses.length)],
          rating: faker.number.int({ min: 1, max: 5 }),
          notes: faker.lorem.sentence(),
          createdBy: testUser._id,
        })
      );
    }
    await Book.insertMany(books);

    return testUser;
  } catch (e) {
    console.error("Database seeding failed:", e.message);
    throw e;
  }
};

module.exports = { seed_db, testUserPassword };
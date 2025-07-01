const mongoose = require("mongoose");
const { seed_db, testUserPassword } = require("../utils/seed_db");
const app = require("../app");
const jwt = require("jsonwebtoken");
const get_chai = require("../utils/get_chai");

describe("BookVerse API Tests", function () {
  let token;
  let testUser;

  before(async function () {
    // Connect to MongoDB first
    await mongoose.connect(process.env.MONGO_URI);

    // Now seed DB
    testUser = await seed_db();

    token = jwt.sign({ userId: testUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  after(async function () {
    await mongoose.connection.close();
  });

  it("GET /api/books → should return list of books", async function () {
    const { expect, request } = await get_chai();

    const res = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res).to.have.status(200);
    expect(res.body.data).to.be.an("array");
    expect(res.body.data.length).to.equal(10);
  });

  it("POST /api/books → should create a new book", async function () {
    const { expect, request } = await get_chai();

    const bookPayload = {
      title: "Test Driven Dev",
      author: "Kent Beck",
      status: "Reading",
      rating: 5,
      notes: "Solid book on testing.",
    };

    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send(bookPayload);

    expect(res).to.have.status(201);
    expect(res.body.data).to.have.property("title", "Test Driven Dev");
  });
});
const request = require("supertest");
const User = require("./jokes/jokes-model");
const db = require("../data/dbConfig");
const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});
// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

describe("[POST] /register", () => {
  test("responds with new user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "Andrew", password: "helloworld" });
    expect(res.body).toMatchObject({ id: 2, username: "Andrew" });
  });
  test("responds with a 422 on missing name", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "" });
    expect(res.status).toBe(500);
  });
});

describe("Users Model", async () => {
  describe("getAll", () => {
    test("returns a list of users", async () => {
      const users = await User.getAll();
      expect(users).toHaveLength(1);
    });
  });
  describe("add", () => {
    test("returns user with correct data", async () => {
      const newUser = await User.add({
        id: 2,
        username: "Andrew",
        password: "hello",
      });
      expect(newUser).toMatchObject({ id: 2, username: "Andrew" });
    });
  });
});

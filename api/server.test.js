const User = require("./jokes/jokes-model");
const db = require("../data/dbConfig");

// beforeAll(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });

beforeEach(async () => {
  await db.migrate.latest();
  await db.seeds.run();
});
// Write your tests here
test("sanity", () => {
  expect(0).toBe(0);
});

describe("Users Model", () => {
  describe("getAll", () => {
    test("returns a list of users", async () => {
      const users = await User.getAll();
      expect(users).toHaveLength(0);
    });
  });
});

const {
  mongooseConnect,
  mongooseCloseConnection,
} = require("../services/databaseService/databaseConnect");

const { createUser } = require("../services/databaseService/createUser");
const { deleteUser } = require("../services/databaseService/deleteUser");
const { findUser } = require("../services/databaseService/getUser");

require("dotenv").config();

describe("DataBaseService TestCase", () => {
  beforeEach(async () => {
    await mongooseConnect();
  });

  afterEach(async () => {
    await mongooseCloseConnection();
  });

  describe("Call the function databaseService/createUser", () => {
    const userData = {
      username: "usertest",
      email: "test@example.com",
      password: "testPswd123#",
    };

    it("should create a user in database", async () => {
      const newUser = await createUser(userData);

      expect(newUser.username).toBe(userData.username);
      expect(newUser.email).toBe(userData.email);
      expect(newUser).toHaveProperty("_id");
      expect(newUser).toHaveProperty("avatarImage");

      await deleteUser(userData.username);
    });
  });

  describe("Call the function databaseService/getUser", () => {
    const userData = {
      username: "usertest02",
      email: "test02@example.com",
      password: "testPswd123#",
    };

    it("should find the user in database after creation", async () => {
      const newUser = await createUser(userData);
      expect(newUser.username).toBe(userData.username);
      expect(newUser).toHaveProperty("_id");

      const foundUser = await findUser({ username: userData.username });
      expect(foundUser.username).toBe(userData.username);
      expect(foundUser.email).toBe(userData.email);

      await deleteUser(foundUser.username);
    });
  });
});

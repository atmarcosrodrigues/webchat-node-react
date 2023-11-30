const request = require("supertest");
const app = require("../index");
const { deleteUser } = require("../services/databaseService/deleteUser");

require("dotenv").config();

const userTest = {
  username: "usertest",
  email: "test@example.com",
  password: "testPswd123#",
};

const routes = { registration: "/api/auth/register", login: "/api/auth/login" };

describe("UserController TestCase", () => {
  afterEach(async () => {
    await deleteUser(userTest.username);
  });

  describe("Call the request POST /api/auth/register with a valid user", () => {
    it("should register a new user", async () => {
      const res = await request(app).post(routes.registration).send(userTest);

      expect(res.statusCode).toEqual(200);
      expect(res.body.user).toHaveProperty("_id");
      expect(res.body.user.username).toEqual(userTest.username);
      expect(res.body.user.email).toEqual(userTest.email);
    });
  });

  describe("Call the request POST /api/auth/register passing a username/email already registrated", () => {
    it("should return a error", async () => {
      const creationResponse = await request(app)
        .post(routes.registration)
        .send(userTest);

      expect(creationResponse.statusCode).toEqual(200);
      expect(creationResponse.body.user).toHaveProperty("_id");

      let newUserTest = { ...userTest };

      const usedUsernameResponse = await request(app)
        .post(routes.registration)
        .send(newUserTest);
      expect(JSON.parse(usedUsernameResponse.text).status).toBe(false);
      expect(JSON.parse(usedUsernameResponse.text).msg).toEqual(
        "Username already used"
      );

      newUserTest.username = "newTestUsername";
      const usedEmailResponse = await request(app)
        .post(routes.registration)
        .send(newUserTest);
      expect(JSON.parse(usedEmailResponse.text).status).toBe(false);
      expect(JSON.parse(usedEmailResponse.text).msg).toEqual(
        "Email already used"
      );
    });
  });

  describe("Call the request POST /api/auth/login with a valid registrated user", () => {
    it("should return the data of user logged", async () => {
      const registrationResponse = await request(app)
        .post(routes.registration)
        .send(userTest);

      expect(registrationResponse.statusCode).toEqual(200);
      expect(registrationResponse.body.user).toHaveProperty("_id");

      const loginResponse = await request(app).post(routes.login).send({
        username: userTest.username,
        password: userTest.password,
      });

      expect(loginResponse.statusCode).toEqual(200);
      expect(loginResponse.body.user).toHaveProperty("_id");
      expect(loginResponse.body.user.username).toEqual(userTest.username);
      expect(loginResponse.body.user.email).toEqual(userTest.email);
    });
  });

  describe("Call the request POST /api/auth/login with a not registrated user", () => {
    it("should return an error informing invalid username/password", async () => {
      const loginResponse = await request(app).post(routes.login).send({
        username: userTest.username,
        password: userTest.password,
      });

      expect(JSON.parse(loginResponse.text).status).toBe(false);
      expect(JSON.parse(loginResponse.text).msg).toEqual(
        "Incorrect Username or Password"
      );
    });
  });
});

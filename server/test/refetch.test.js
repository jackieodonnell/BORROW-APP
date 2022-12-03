const request = require("supertest");
const app = require("../index");
jest.setTimeout(20000);

describe("Testing routes and responses for REFETCH user request as", () => {
  test.skip("It successfully finds and validates a logged in user", async () => {
    await request(app)
      .get("/api/v1/yeyoteef/validate")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlleW90ZWVmIiwiaWF0IjoxNjcwMDg5OTAwLCJleHAiOjE2NzAwOTM1MDB9.RHn031tVD51J7Zd52ZpYyoHt9sMi2tVjeOyJ_s44Aok",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ user: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ loans: expect.any(Array) })
        );
      })
      .catch((err) => console.log(err));
  });

  test("It will give feedback if no token is found", async () => {
    await request(app)
      .get("/api/v1/yeyoteef/validate")
      .set({
        Authorization: "",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "No token found" })
        );
      })
      .catch((err) => console.log(err));
  });

  test("It will give feedback if token is invalid/expired", async () => {
    await request(app)
      .get("/api/v1/yeyoteef/validate")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI2NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlleW90ZWVmIiwiaWF0IjoxNjcwMDg5OTAwLCJleHAiOjE2NzAwOTM1MDB9.RHn031tVD51J7Zd52ZpYyoHt9sMi2tVjeOyJ_s44Aok",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Invalid/Expired Token" })
        );
      })
      .catch((err) => console.log(err));
  });
});

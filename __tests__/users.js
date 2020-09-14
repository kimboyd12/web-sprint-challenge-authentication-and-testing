const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeAll(async () => {
    await db('users').truncate();
  });

afterAll(async () => {
    await db.destroy()
})

describe("testing endpoints", () => {
    
    // POST
    // 1
    it("POST /register returns 201", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({ username: "test125", password: "test125"})
            expect(res.statusCode).toBe(201)
            expect(res.body.username).toBe("test125")
    })

    // 2
    it("POST /register returns json", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({ username: "test123", password: "test123"})
            expect(res.type).toBe("application/json")
    })

    // LOGIN
    // 1
    it("POST /login returns 200", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({ username: "test125", password: "test125"})
            expect(res.statusCode).toBe(200)
    })

    // 2
    it("POST /login returns json message", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({username: "test125", password: "test125"})
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("Welcome test125!")
    })

    // JOKES
    // 1
    it("GET /jokes return json", async () => {
        const res = await supertest(server).get("/api/jokes")
        expect(res.type).toBe("application/json")
    })

    // 2
    it("GET /jokes to return 401 if not authorized", async () => {
        const res = await supertest(server).get("/api/jokes")
        expect(res.statusCode).toBe(401)
    })

})

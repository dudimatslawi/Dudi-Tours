import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { StatusCode } from "../src/3-models/error-enums";


describe("Testing likes controllers", () => {

    let token: string;

    before(async () => {
        const response = await supertest(app.server).post("/api/login")
            .send({ email: "dodim666@gmail.com", password: "123456" });
        token = response.body
    });


    it("Should response a created status", async () => {
        const response = await supertest(app.server).post("/api/users/3/vacations/2")
        .set("Authorization", "Bearer " + token)
        expect(response.status).to.be.equal(StatusCode.Created)
    })

    it("Should response a no content status", async () => {
        const response = await supertest(app.server).delete("/api/users/3/vacations/2")
            .set("Authorization", "Bearer " + token)
        expect(response.status).to.be.equal(StatusCode.NoContent)
    })


})

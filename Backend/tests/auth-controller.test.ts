import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import fs from "fs"
import { app } from "../src/app";
import { VacationModel } from "../src/3-models/vacation-model";
import { StatusCode } from "../src/3-models/error-enums";
import { RoleModel } from "../src/3-models/role-model";


function getRandomEmail() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let email = '';
    for (let i = 0; i < 10; i++) {
        email += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    email += '@blabla.com';
    return email;
}
describe("Testing auth controllers", () => {

    it("sign up - should return token and created status", async () => {
        const response = await supertest(app.server).post("/api/register")
            .field("firstName", "test")
            .field("lastName", "test")
            .field("email", getRandomEmail())
            .field("password", "123456")
            .field("roleId", RoleModel.User)
        const token = response.body
        expect(typeof token).to.be.equal("string")
        expect(response.status).to.be.equal(StatusCode.Created)

    })

    it("login- should response token", async () => {
        const response = await supertest(app.server).post("/api/login")
            .field("email", "dodim6666@gmail.com")
            .field("password", "123456")
        const token = response.body
        expect(typeof token).to.be.equal("string")
    })


})

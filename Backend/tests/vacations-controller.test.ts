import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import fs from "fs"
import { app } from "../src/app";
import { VacationModel } from "../src/3-models/vacation-model";
import { StatusCode } from "../src/3-models/error-enums";


describe("Testing vacations controllers", () => {

    let image: Buffer;
    let token: string;
    let id: number;

    before(async () => {
        image = fs.readFileSync(__dirname + "\\resources\\pizza.jpg");
        const response = await supertest(app.server).post("/api/login")
            .send({ email: "dodim6666@gmail.com", password: "123456" });
        token = response.body
    });

    it("Should return vacations array", async () => {
        const response = await supertest(app.server).get("/api/allVacations/3")
            .set("Authorization", "Bearer " + token)
        const vacations: VacationModel[] = response.body;
        expect(vacations.length).to.be.greaterThanOrEqual(1);
        expect(vacations[0]).to.contain.keys("id", "destination", "description", "startDate", "endDate", "price", "imageName", "imageUrl", "isLiked", "likesCount")
    })

    it("Should return vacations", async () => {
        const response = await supertest(app.server).get("/api/oneVacation/1")
            .set("Authorization", "Bearer " + token);
        const vacation: VacationModel = response.body;
        expect(vacation).to.not.be.empty;
        expect(vacation).to.contain.keys("id", "destination", "description", "startDate", "endDate", "price", "imageName", "imageUrl")

    });

    it("should add a new vacation", async () => {
        const response = await supertest(app.server).post("/api/addVacation")
            .set("Authorization", "Bearer " + token)
            .field("destination", "aaa")
            .field("description", "aaa as sf afsgd dh rr erh gffgncvcvb dhdfh gn cvgfgh fnc vrtj df dry bn ft h f cht t reye rgfdgs gdfb grs rg sxgsge")
            .field("startDate", "2024-01-01")
            .field("endDate", "2024-01-01")
            .field("price", 100)
            .field("image", image)
        const addedVacation = response.body;
        id = addedVacation.id;
        expect(addedVacation).to.contain.keys("id", "destination", "description", "startDate", "endDate", "price", "imageName", "imageUrl")
    })

    it("should update an vacation", async () => {
        const response = await supertest(app.server).put(`/api/editVacation/${id}`)
            .set("Authorization", "Bearer " + token)
            .field("destination", "aaaaaa")
            .field("description", "aaa as sf afsgd dh rr erh gffgncvcvb dhdfh gn cvgfgh fnc vrtj df dry bn ft h f cht t reye rgfdgs gdfb grs rg sxgsge")
            .field("startDate", "2024-01-01")
            .field("endDate", "2024-01-01")
            .field("price", 100)
            .field("image", image)
        const updatedVacation = response.body
        expect(updatedVacation).to.contain.keys("id", "destination", "description", "startDate", "endDate", "price", "imageName", "imageUrl")
    });

    it("Should delete an vacation", async () => {
        const response = await supertest(app.server).delete(`/api/deleteVacation/${id}`)
            .set("Authorization", "Bearer " + token)
        expect(response.body).to.be.empty;
        expect(response.status).to.be.equal(StatusCode.NoContent);
    })

    it("Should response with a 404 error", async () => {
        const response = await supertest(app.server).get("/api/aaaaa")
            .set("Authorization", "Bearer " + token)
        expect(response.status).to.be.equal(StatusCode.NotFound)
    })

    it("Should response with a resource not found error", async () => {
        const response = await supertest(app.server).get("/api/oneVacation/2000")
            .set("Authorization", "Bearer " + token)
        expect(response.status).to.be.equal(StatusCode.NotFound)
    })

    it("Should response with a resource not found error", async () => {
        const response = await supertest(app.server).delete("/api/deleteVacation/2000")
            .set("Authorization", "Bearer " + token)
        expect(response.status).to.be.equal(StatusCode.NotFound)
    })


})

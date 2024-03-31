import express, { NextFunction, Request, Response } from "express";
import { vacationService } from "../5-services/vacations-service";
import { VacationModel } from "../3-models/vacation-model";
import { StatusCode } from "../3-models/error-enums";
import { fileSaver } from "uploaded-file-saver";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { log } from "console";

// Data controller:
class VacationController {

    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();

    // Register routes once: 
    public constructor() {
        this.registerRoutes();
    }

    // Register routes:
    private registerRoutes(): void {
        this.router.get("/allVacations/:userId(\\d+)", securityMiddleware.verifyLoggedIn, this.getAllVacations);
        this.router.get("/oneVacation/:id(\\d+)", securityMiddleware.verifyLoggedIn, this.getOneVacation);
        this.router.post("/addVacation", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.addVacation);
        this.router.put("/editVacation/:id(\\d+)", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.updateVacations);
        this.router.delete("/deleteVacation/:id(\\d+)", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.deleteVacation);
        this.router.get("/vacations/images/:imageName", this.getImage)
    }

    // GET http://localhost:4000/api/vacations/:userId
    private async getAllVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const userId = +request.params.userId
            const vacations = await vacationService.getAllVacations(userId);
            response.json(vacations);
        }
        catch (err: any) { next(err); }
    }

    // GET http://localhost:4000/api/vacation/:id
    private async getOneVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id
            const vacation = await vacationService.getOneVacation(id);
            response.json(vacation);
        }
        catch (err: any) { next(err); }
    }
    // post http://localhost:4000/api/addVacation/
    private async addVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            const vacation = new VacationModel(request.body);
            const addedVacation = await vacationService.addVacation(vacation);
            response.status(StatusCode.Created).json(addedVacation);
        }
        catch (err: any) { next(err) };
    }
    // put http://localhost:4000/api/vacation/:id
    private async updateVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            request.body.id = +request.params.id;
            const vacation = new VacationModel(request.body);
            const updatedVacation = await vacationService.updateVacation(vacation);
            console.log(updatedVacation);
            
            response.json(updatedVacation);
        }
        catch (err: any) { next(err) }

    }
    // delete http://localhost:4000/api/
    private async deleteVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id
            await vacationService.deleteVacation(id);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) { next(err) }

    }
    // get "http://localhost:4000/api/products/images/"
    private async getImage(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName);
            response.sendFile(imagePath); // response the actual image file


        }
        catch (err: any) { next(err) }

    }



};

const vacationController = new VacationController();
export const vacationRouter = vacationController.router;

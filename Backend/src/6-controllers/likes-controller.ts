import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/error-enums";
import { likesService } from "../5-services/likes-service";
class LikesController {

    public readonly router = express.Router();

    public constructor() {
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.post("/users/:userId(\\d+)/vacations/:vacationId(\\d+)", this.addLike)
        this.router.delete("/users/:userId(\\d+)/vacations/:vacationId(\\d+)", this.unLike)
    }

    //  post http://localhost:4000/api/users/4/vacations/3
    private async addLike(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const userId = +request.params.userId;
            const vacationId = +request.params.vacationId;
            await likesService.addLike(userId, vacationId);
            response.sendStatus(StatusCode.Created);

        }
        catch (err: any) { next(err) }
    }

    //  post http://localhost:4000/api/users/4/vacations/3
    private async unLike(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const userId = +request.params.userId;
            const vacationId = +request.params.vacationId;
            await likesService.unlike(userId, vacationId);
            response.sendStatus(StatusCode.NoContent);

        }
        catch (err: any) { next(err) }
    }


}
const likesController = new LikesController();
export const likesRouter = likesController.router;
import UserModel from "../Models/UserModel";
import VacationModel from "../Models/VacationModel"

export type AppState = {
    // first slice - array of vacation:
    vacations: VacationModel[];

    // second slice 
    user: UserModel;

}
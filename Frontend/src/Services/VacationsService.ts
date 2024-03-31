import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { appStore } from "../Redux/store";
import { appConfig } from "../Utils/AppConfig";
import { vacationsActionCreators } from "../Redux/VacationsSlice";

class VacationsService {

    public async getAllVacations(userId: number): Promise<VacationModel[]> {

        // get all vacations from backend:
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + "allVacations/" + userId);

        // extract vacations from response:
        const vacations = response.data;

        // create action for all vacations:
        const action = vacationsActionCreators.initAll(vacations);

        // send action to global state:
        appStore.dispatch(action);

        // return vacations to the component:
        return vacations;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        // get all vacations from global state:
        let vacations = appStore.getState().vacations;

        // check if the vacation exist:
        let vacation = vacations.find(v => v.id === id);

        // return vacation if in global state
        if (vacation) return vacation;

        // get one vacation from backend:
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + "oneVacation/" + id);

        // extract vacation from response:
        vacation = response.data;

        // return vacation to component:
        return vacation;
    }

    // add vacation:
    public async addVacation(vacation: VacationModel): Promise<void> {
        // add new vacation to backend
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl + "addVacation", vacation, appConfig.axiosOptions);

        // extract the added vacation from the response:
        const addedVacation = response.data

        // create action for adding a vacation to the global state:
        const action = vacationsActionCreators.addOne(addedVacation);

        // send action to global state
        appStore.dispatch(action)
    }

    // update vacation
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // send vacation to the backend:
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + "editVacation/" + vacation.id, vacation, appConfig.axiosOptions);

        // extract the updated vacation from response:
        const updatedVacation = response.data;

        // create action for update a vacation to the global state:
        const actions = vacationsActionCreators.updateOne(updatedVacation);

        // send action to global state
        appStore.dispatch(actions);

    }

    // delete vacation:
    public async deleteVacation(id: number): Promise<void> {

        // delete vacation from the backend:
        await axios.delete(appConfig.vacationsUrl + "deleteVacation/" + id)

        // create action for delete a vacation from the global state:
        const action = vacationsActionCreators.deleteOne(id);

        // send action to global state
        appStore.dispatch(action)
    }

    public async addLike(vacation: VacationModel): Promise<void> {
        await axios.post(appConfig.vacationsUrl + "users/" + appStore.getState().user.id + "/vacations/" + vacation.id)
        await this.getAllVacations(appStore.getState().user.id);
    }
    public async unLike(vacation: VacationModel): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + "users/" + appStore.getState().user.id + "/vacations/" + vacation.id)
        await this.getAllVacations(appStore.getState().user.id);
    }

    public isAugust2024(dateString: string) {
        const date = new Date(dateString);
        return date.getFullYear() === 2024 && date.getMonth() === 7; // Month index is zero-based
    }

    public calculateDiscountedPrice(price: number) {
        return (price * 0.9).toFixed(2); // Applying 10% discount
    }


}
export const vacationsService = new VacationsService();
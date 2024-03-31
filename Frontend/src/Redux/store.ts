import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { authReducersContainer } from "./AuthSlice";
import { vacationsReducerContainer } from "./VacationsSlice";

// creating the application store - the redux manager object
export const appStore = configureStore<AppState>({
    reducer: {
        vacations: vacationsReducerContainer,
        user: authReducersContainer
    }
})
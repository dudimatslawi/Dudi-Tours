// our slice's data is products array

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import VacationModel from "../Models/VacationModel"

// reducer for adding all vacations to the global state:
function initAll(currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    const newState = action.payload;
    return newState;
}

// reducer for add one vacation to vacations array:
function addOne(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState, action.payload];
    return newState;
}

// reducer for update vacation:
function updateOne(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const vacationToUpdate = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(v => v.id === vacationToUpdate.id);
    if (index >= 0) newState[index] = vacationToUpdate
    return newState
}

// reducer for delete vacation:
function deleteOne(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(v => v.id === idToDelete);
    if (index >= 0) newState.splice(index, 1);
    return newState
}

// reducer for delete vacation:
function filterByLike(currentState: VacationModel[], action: PayloadAction<boolean>): VacationModel[] {
    const isChecked = action.payload;
    const newState = [...currentState];
    if (isChecked) {
        return newState.filter(v => v.isLiked === 1)
    }
    return newState
}

// create the product slice:
const vacationsSlice = createSlice({
    name: "vacations", //unique name for slice
    initialState: [],
    reducers: { initAll, addOne, updateOne, deleteOne, filterByLike }
})

// expose a single object containing functions for creating action objects:
export const vacationsActionCreators = vacationsSlice.actions;

// expose a single object for containing all reducers:
export const vacationsReducerContainer = vacationsSlice.reducer;


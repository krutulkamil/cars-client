import { RootState } from "../../store";
import { createSelector } from "reselect"

const selectHomePage = (state: RootState) => state.homePage;

export const makeSelectTopCars = createSelector(
    selectHomePage, (homePage) => homePage.topCars
);
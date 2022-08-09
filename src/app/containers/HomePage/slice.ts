import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IHomePageState} from "./type";
import {GetCars_cars} from "../../services/carService/__generated__/GetCars";

const initialState: IHomePageState = {
    topCars: [],
}

export const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setTopCars: (state, action: PayloadAction<GetCars_cars[]>) => {
            state.topCars = action.payload;
        }
    }
});

export const { setTopCars } = homePageSlice.actions;
export default homePageSlice.reducer;
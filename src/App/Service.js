import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData: null,
}

const authservice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
            state.status = true;
        },
        logout: (state) => {
            state.userData = null;
            state.status = false;
            
        }
    }
});
export const { login, logout } = authservice.actions;
export default authservice.reducer;
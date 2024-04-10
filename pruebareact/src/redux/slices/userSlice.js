import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        isAdmin: false,
        isClient: false,
        roles: [],
        isLoggedIn: false
    },
    reducers: {
        setLoginInfo: (state, action) => {
            state.email = action.payload.email;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setUserRoles: (state, action) => {
            state.isAdmin = action.payload.isAdmin;
            state.isClient = action.payload.isClient;
            state.roles = action.payload.roles;
            state.isLoggedIn = true;
            state.email = action.payload.email;

        },
        clearUserInfo: state => {
            state.email = null;
            state.isAdmin = false;
            state.isClient = false;
            state.roles = [];
            state.isLoggedIn = false;
        }
    }
})

export const {setLoginInfo, setUserRoles, clearUserInfo} = userSlice.actions
export default userSlice.reducer;
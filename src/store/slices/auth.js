import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
name: 'auth',
initialState: {
    state: "checking",
    user: {},
    message: null
},
reducers: {
    checking: (state) => {
        state.state = "checking"
        state.user = {}
        state.message = null
    },
    login: (state, {payload}) => {
        state.state = "authenticated"
        state.user = payload
        state.message = null
    },
    onLogout: (state,{payload}) => {
        state.state = "not-authenticated"
        state.user = {}
        state.message = payload
    },
    clearMessage: (state,{payload}) => {
        state.message = null
    }

}
});


export const { checking,clearMessage,login,onLogout} = authSlice.actions;
export default authSlice.reducer
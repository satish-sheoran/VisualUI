import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
    name: 'systemSlice',
    initialState: {
        userDetails: { userName: 'Ram', email : 'ram@gmail.com', password : 'ram12&'},
        CurrentPage: 'WorkSpacePage',
        ActivePage: 'Home'
    },
    reducers: {
        setCurrentPage(state, action) {
            const newPage = action.payload.newPage;
            if (!newPage) return;
            state.CurrentPage = (newPage !== 'LoadingInitialPage' && newPage !== 'GetStartedPage' && newPage !== 'WorkSpacePage' && newPage !== 'SignUpPage' && newPage !== 'LoginPage') ? 'LoadingInitialPage' : newPage
        },
        setActivePage(state, action) {
            const { newSection } = action.payload;
            if (!newSection || (newSection !== 'Home' && newSection !== 'Assets' && newSection !== 'Projects' && newSection !== 'Profile' && newSection !== 'Settings')) return;
            state.ActivePage = newSection
        },
        setuserDetails(state, action) {
            const { userName, email, password } = action.payload;
            if (!userName || !email || !password) return;
            state.userDetails = { userName, email, password }
        }

    }
})

export const { setCurrentPage, setActivePage, setuserDetails } = systemSlice.actions;

export default systemSlice.reducer;
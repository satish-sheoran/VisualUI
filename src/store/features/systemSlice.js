import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
    name: 'systemSlice',
    initialState: {
        CurrentPage: 'Loading',
        ActivePage: 'Home'
    },
    reducers: {
        setCurrentPage(state, action) {
            const newPage = action.payload.newPage;
            if (!newPage) return;
            state.CurrentPage = (newPage !== 'Loading' && newPage !== 'GetStarted' || newPage !== 'App') ? 'Loading' : newPage
        },
        setActivePage(state, action) {
            const { newSection } = action.payload;
            if (!newSection || (newSection !== 'Home' && newSection !== 'Assets' && newSection !== 'Projects' && newSection !== 'Profile')) return;
            state.ActivePage = newSection
        }

    }
})

export const { setCurrentPage ,setActivePage} = systemSlice.actions;

export default systemSlice.reducer;
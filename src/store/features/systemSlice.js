import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
    name: 'systemSlice',
    initialState: {
        CurrentPage : 'Loading'
    },
    reducers: {
        setCurrentPage(state, action) {
            const newPage = action.payload.newPage;
            if(!newPage) return;
            state.CurrentPage = (newPage !=='Loading' && newPage !=='GetStarted' || newPage !=='App')?'Loading':newPage
        },
        
    }
})

export const { setCurrentPage } = systemSlice.actions;

export default systemSlice.reducer;
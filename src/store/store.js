import { configureStore } from "@reduxjs/toolkit";
import DevicePreferences from './features/DevicePreferences'
import systemSliceSlice from './features/systemSlice'

export const store = configureStore({
    reducer: {
        Preferences: DevicePreferences,
        systemSlice : systemSliceSlice
    },
    // devTools : true
})
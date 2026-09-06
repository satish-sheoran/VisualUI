import { configureStore } from "@reduxjs/toolkit";
import DevicePreferences from './features/DevicePreferences'
import systemSliceSlice from './features/systemSlice'
import CanvasSlice from './features/Canvas'

export const store = configureStore({
    reducer: {
        Preferences: DevicePreferences,
        systemSlice : systemSliceSlice,
        Canvas : CanvasSlice
    },
    // devTools : true
})
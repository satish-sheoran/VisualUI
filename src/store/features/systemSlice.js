import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { INITIAL_SETTINGS } from "../../constants/Settings";

const systemSlice = createSlice({
    name: 'systemSlice',
    initialState: {
        userDetails: {userName: 'Ram', email: 'ram@gmail.com', password: 'ram12&'  },
        CurrentPage: 'WorkSpacePage',
        ActivePage: 'Home',
        Settings: INITIAL_SETTINGS
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
        },
        updateSetting(state, action) {
            // Setting section is the section ( like general ,system appearance etc.) while option is the setting need to be changed ex : Theme, Accent color etc.
            const { SettingSection, option, value } = action.payload

            if (!SettingSection || !option) return;

            if (
                !Object.hasOwn(state.Settings, SettingSection)
                || !Object.hasOwn(state.Settings[SettingSection], option)
            ) return;

            state.Settings[SettingSection] = {
                ...state.Settings,
                ...state.Settings[SettingSection],
                [option]: value
            };
        },
        ResetSettings(state) {
            state.Settings = INITIAL_SETTINGS
        }
    }
})

export const { setCurrentPage, setActivePage, setuserDetails, updateSetting, ResetSettings } = systemSlice.actions;

export default systemSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_SETTINGS, SETTING_SECTIONS } from "../../constants/Settings";
import { ACCENT_COLORS } from "../../constants/style";
import { ALL_SECTIONS } from "../../constants";

const GetSavedSettings = () => {
    const savedSettings = localStorage.getItem('settings');
    if (!savedSettings) return INITIAL_SETTINGS;

    try {
        const parsedSetting = JSON.parse(savedSettings);

        // 1. Initial integrity check
        if (
            Array.isArray(parsedSetting) ||
            typeof parsedSetting !== 'object' ||
            Object.keys(parsedSetting).length === 0
        ) {
            return INITIAL_SETTINGS;
        }

        // 2. Clone baseline defaults
        const cleanSettings = structuredClone(INITIAL_SETTINGS);

        // ==========================================
        // 3. Strict Whitelist Validation Maps
        // ==========================================
        const validStartupBehaviours = new Set(ALL_SECTIONS.map(s => s.Section));

        // Extract allowed string values for language options
        const generalOptions = SETTING_SECTIONS.find(s => s.id === 'General')?.Options || [];

        const langOptions = generalOptions.find(o => o.id === 'control-language')?.options || [];

        const validLanguages = new Set(langOptions.map(l => l.value));

        const validAccentColors = new Set(ACCENT_COLORS.map(c => c.COLOR));

        // ==========================================
        // 4. Safe Assignment Pipeline
        // ==========================================

        // --- General Section ---
        const savedStartup = parsedSetting['General']?.['startup-behaviour'];
        if (validStartupBehaviours.has(savedStartup)) {
            cleanSettings['General']['startup-behaviour'] = savedStartup;
        }

        const savedLang = parsedSetting['General']?.['control-language'];
        if (validLanguages.has(savedLang)) {
            cleanSettings['General']['control-language'] = savedLang;
        }

        // --- Appearance Section ---
        const savedAccent = parsedSetting['Appearance']?.['accent-color'];
        if (validAccentColors.has(savedAccent)) {
            cleanSettings['Appearance']['accent-color'] = savedAccent;
        }

        // --- Booleans / Numbers (Canvas, Editor, Performance, Storage) ---
        const safelyAssignType = (section, option, expectedType) => {
            const val = parsedSetting[section]?.[option];
            if (typeof val === expectedType) {
                // If it's a number (like auto-save-interval), add your bounds check
                if (expectedType === 'number' && (val > 600 || val < 60)) return;
                cleanSettings[section][option] = val;
            }
        };


        const safelySecAndOps = [
            {
                section: 'Canvas',
                option: 'show-grid',
                expectType: 'boolean'
            },
            {
                section: 'Editor',
                option: 'elem-delete-confirmation',
                expectType: 'boolean'
            },
            {
                section: 'Editor',
                option: 'auto-select-newCreated-elem',
                expectType: 'boolean'
            },
            {
                section: 'Performance',
                option: 'performance-mode',
                expectType: 'boolean'
            },
            {
                section: 'Performance',
                option: 'reduce-animations',
                expectType: 'boolean'
            },
            {
                section: 'Storage-&-Data',
                option: 'auto-save',
                expectType: 'boolean'
            },
            {
                section: 'Storage-&-Data',
                option: 'auto-save-interval',
                expectType: 'number'
            },
            {
                section: 'Experimental',
                option: 'enable-experimental-features',
                expectType: 'boolean'
            }
        ]


        safelySecAndOps.forEach(({ section, option, expectType }) => {
            safelyAssignType(section, option, expectType)
        })

        return cleanSettings;

    } catch (error) {
        console.error("Error parsing saved settings from localStorage:", error);
        return INITIAL_SETTINGS;
    }
};


const systemSlice = createSlice({
    name: 'systemSlice',
    initialState: {
        userDetails: { userName: 'Ram', email: 'ram@gmail.com', password: 'ram12&' },
        CurrentPage: 'WorkSpacePage',
        ActivePage: 'Home',
        Settings: GetSavedSettings()
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

            // 1. Guard clauses
            if (!SettingSection || !option) return;
            if (
                !Object.hasOwn(state.Settings, SettingSection) ||
                !Object.hasOwn(state.Settings[SettingSection], option)
            ) return;

            // 2. Safely update the specific target path in the Redux state
            state.Settings[SettingSection][option] = value;

            // 3. Save the clean, complete updated structure to localStorage
            // (Since state.Settings has already been updated in the line above)
            localStorage.setItem('settings', JSON.stringify(state.Settings));
        },
        ResetSettings(state) {
            state.Settings = INITIAL_SETTINGS
        }
    }
})

export const { setCurrentPage, setActivePage, setuserDetails, updateSetting, ResetSettings } = systemSlice.actions;

export default systemSlice.reducer;
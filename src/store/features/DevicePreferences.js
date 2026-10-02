import { createSlice } from "@reduxjs/toolkit";
import { AnimationsName, AnimationSpeedAndType, FONT_FAMILY, FONT_SIZES, THEMES } from "../../constants/style";

const savedSettings = () => {
    const savedSettings = localStorage.getItem('settings');
    if (!savedSettings) return {
        Theme: THEMES['Light'],
        Font: FONT_FAMILY.find(font => font.Name === 'Plus Jakarta Sans'),
        FontSize: FONT_SIZES.find(({ SizeType }) => SizeType === 'Default')
    };

    try {
        const parsedSetting = JSON.parse(savedSettings);

        // 1. Initial integrity check
        if (
            Array.isArray(parsedSetting) ||
            typeof parsedSetting !== 'object' ||
            Object.keys(parsedSetting).length === 0
        ) {
            return {
                Theme: THEMES['Light'],
                Font: FONT_FAMILY.find(font => font.Name === 'Plus Jakarta Sans'),
                FontSize: FONT_SIZES.find(({ SizeType }) => SizeType === 'Default')
            };
        }

        // 2. Clone baseline defaults
        const cleanSettings = structuredClone({
            Theme: THEMES['Light'],
            Font: FONT_FAMILY.find(font => font.Name === 'Plus Jakarta Sans'),
            FontSize: FONT_SIZES.find(({ SizeType }) => SizeType === 'Default')
        });

        const savedTheme = parsedSetting['Appearance']?.['theme'];
        if (savedTheme && THEMES[savedTheme]) cleanSettings.Theme = THEMES[savedTheme];

        const savedFontFamily = parsedSetting['Appearance']?.['font-family'];
        if (savedFontFamily && FONT_FAMILY.some(font => font.Name === savedFontFamily)) {
            cleanSettings.Font = FONT_FAMILY.find(font => font.Name === savedFontFamily);
        }

        const savedFontSize = parsedSetting['Appearance']?.['font-size'];
        if (savedFontSize && FONT_SIZES.some(size => size.SizeType === savedFontSize)) {
            cleanSettings.FontSize = FONT_SIZES.find(size => size.SizeType === savedFontSize);
        }

        return cleanSettings;

    } catch (error) {
        console.error("Error parsing saved settings from localStorage:", error);
        return {
            Theme: THEMES['Light'],
            Font: FONT_FAMILY.find(font => font.Name === 'Plus Jakarta Sans'),
            FontSize: FONT_SIZES.find(({ SizeType }) => SizeType === 'Default')
        };
    }
}

const DevicePreferences = createSlice({
    name: 'Preferences',
    initialState: {
        Device: window.innerWidth < 768 ? 'Mobile' : window.innerWidth <= 1023 ? 'Tablet' : 'Desktop',
        Theme: savedSettings()?.Theme || THEMES['Light'],
        AnimationTypeNSpeed: AnimationSpeedAndType.find(({ Name }) => Name === 'Normal'),
        AnimationName: AnimationsName.find(({ Name }) => Name === 'Back Out'),

        //font family
        Font: savedSettings()?.Font || FONT_FAMILY.find(font => font.Name === 'Plus Jakarta Sans'),
        FontSize: savedSettings()?.FontSize || FONT_SIZES.find(({ SizeType }) => SizeType === 'Default')
    },
    reducers: {
        setDevice(state, action) {
            const width = action.payload.width;
            state.currDevice = width < 768 ? 'Mobile' : width <= 1023 ? 'Tablet' : 'Desktop';
        },
        updateTheme(state, action) {
            const { newTheme } = action.payload;
            if (!newTheme) return;
            if (newTheme === 'Toggle') {
                state.Theme = state.Theme['Theme'] !== 'Dark' ? THEMES['Dark'] : THEMES['Light']
                return;
            }
            state.Theme = THEMES[newTheme] ?? THEMES['Light']

            const Savedsettings = JSON.parse(localStorage.getItem('settings')) || {};
            localStorage.setItem(
                'settings',
                JSON.stringify({ ...Savedsettings, Appearance: { ...Savedsettings.Appearance, 'theme': state.Theme['Theme'] } })
            );
        },
        setFontSize(state, action) {
            const Size = FONT_SIZES.find(size => size.SizeType === action.payload.Size);
            if (!Size) return;
            state.FontSize = Size;

            const Savedsettings = JSON.parse(localStorage.getItem('settings')) || {};
            localStorage.setItem('settings', JSON.stringify({ ...Savedsettings, Appearance: { ...Savedsettings.Appearance, 'font-size': state.FontSize['SizeType'] } }));
        },
        setFontFamily(state, action) {
            const Family = FONT_FAMILY.find(font => font.Name === action.payload.FontFamily);
            if (!Family) return;
            state.Font = Family;

            const Savedsettings = JSON.parse(localStorage.getItem('settings')) || {};
            localStorage.setItem('settings', JSON.stringify({ ...Savedsettings, Appearance: { ...Savedsettings.Appearance, 'font-family': state.Font['Name'] } }));
        },
        setDefault(state) {
            state.Font = FONT_FAMILY.find(font => font.Name === 'Plus Jakarta Sans'),
                state.Theme = THEMES['Light']
            state.FontSize = FONT_SIZES.find(({ SizeType }) => SizeType === 'Default')

            const Savedsettings = JSON.parse(localStorage.getItem('settings')) || {};
            localStorage.setItem('settings', JSON.stringify({ ...Savedsettings, Appearance: { ...Savedsettings.Appearance, 'font-family': state.Font['Name'] , 'font-size': state.FontSize['SizeType'] ,'theme' : state.Theme['Theme'] } }));
        }
    }
})

export const { updateTheme, setDevice, setFontSize, setFontFamily, setDefault } = DevicePreferences.actions;

export default DevicePreferences.reducer;
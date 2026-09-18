import { createSlice } from "@reduxjs/toolkit";
import { AnimationsName, AnimationSpeedAndType, FONT_FAMILY, FONT_SIZES, THEMES } from "../../constants/style";
import { toast } from "react-toastify";

const DevicePreferences = createSlice({
    name: 'Preferences',
    initialState: {
        Device: window.innerWidth < 768 ? 'Mobile' : window.innerWidth <= 1023 ? 'Tablet' : 'Desktop',
        Theme: THEMES['Light'],
        AnimationTypeNSpeed: AnimationSpeedAndType.find(({ Name }) => Name === 'Normal'),
        AnimationName: AnimationsName.find(({ Name }) => Name === 'Back Out'),

        //font family
        Font: FONT_FAMILY.find(font => font.Name === 'Plus Jakarta Sans'),
        FontSize: FONT_SIZES.find(({ SizeType }) => SizeType === 'Default')
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
            // toast.info('aa gya ,',newTheme)
            state.Theme = THEMES[newTheme] ?? THEMES['Light']
        },
        setFontSize(state, action) {
            const Size = FONT_SIZES.find(size => size.SizeType === action.payload.Size);
            if (!Size) return;
            state.FontSize = Size;
        },
        setFontFamily(state, action) {
            const Family = FONT_FAMILY.find(font => font.Name === action.payload.FontFamily);
            if (!Family) return;
            state.Font = Family;

        },
        setDefault(state) {
            state.Font = FONT_FAMILY.find(font => font.Name === 'Plus Jakarta Sans'),
                state.Theme = THEMES['Light']
            state.FontSize = FONT_SIZES.find(({ SizeType }) => SizeType === 'Default')
        }
    }
})

export const { updateTheme, setDevice, setFontSize, setFontFamily,setDefault } = DevicePreferences.actions;

export default DevicePreferences.reducer;
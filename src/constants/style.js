// THEMES AND COLORS

export const ACCENT_COLORS = [
    {
        COLOR: 'Blue',
        CODE: '#3B82F6',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(59, 130, 246, 0.2)',
        Hover_Clr: '#6096f3',
        Active_Clr: '#6096f3'

    },
    {
        COLOR: 'Red',
        CODE: '#EF4444',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(239, 68, 68, 0.2)',
        Hover_Clr: '#ff6157',
        Active_Clr: '#ff6157'
    },
    {
        COLOR: 'Purple',
        CODE: '#7C3AED',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(124, 58, 237, 0.2)',
        Hover_Clr: '#9867EF',
        Active_Clr: '#9867EF'
    },
    {
        COLOR: 'Magenta',
        CODE: '#D52DEB',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(213, 45, 235, 0.2)',
        Hover_Clr: '#DC50EC',
        Active_Clr: '#D84AED'
    },
    {
        COLOR: 'Yellow',
        CODE: '#FACC15',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(250, 204, 21, 0.2)',
        Hover_Clr: '#FAD74c',
        Active_Clr: '#FAD74C'
    },
    {
        COLOR: 'Lime',
        CODE: '#84CC16',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(132, 204, 22, 0.2)',
        Hover_Clr: '#A9ED45',
        Active_Clr: '#A9ED45'
    },
    {
        COLOR: 'Green',
        CODE: 'rgb(38, 165, 22)',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(38, 165, 22, 0.2)',
        Hover_Clr: '#31D322',
        Active_Clr: '#31D322'
    },
    {
        COLOR: 'Cyan',
        CODE: '#22D3EE',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(34, 211, 238, 0.2)',
        Hover_Clr: '#58DEEE',
        Active_Clr: '#58DEEE'
    },
    {
        COLOR: 'Slate_Gray',
        CODE: '#94A3B8',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(148, 163, 184, 0.2)',
        Hover_Clr: '#B8C3D0',
        Active_Clr: '#B8C3D0'
    },
    {
        COLOR: 'Orange',
        CODE: 'rgb(237,129,20)',
        HOVER: 'HOVER_CLASS',
        Bg_Clr: 'rgba(237,129,20,0.2)',
        Hover_Clr: '#ED9840',
        Active_Clr: '#ED9840'
    }
]

export const THEMES = {
    'Dark': {
        Theme: 'Dark',
        header: '#252525',
        bg: '#38383A',

        primary: 'rgb(1,1,1)',
        sec: 'rgb(23,23,25)',
        third: 'rgb(45,45,47)',

        primaryText: '#FFFFFF',
        secText: '#E6E6E6',
        thirdText: '#BFBFBF',

        grayish: 'rgb(145,145,145)',
        whiteBg: '#FFFFFF',
    },
    'Light': {
        Theme: 'Light',
        header: '#FFFFFF',
        bg: '#F4F8FF',
        primary: '#FFFFFF',
        sec: '#EAF1FF',
        third: '#D6E5FF',

        primaryText: '#0A0A0A',
        secText: '#4F5D75',
        thirdText: '#7B879D',

        grayish: '#8A94A6',
        blackBg: '#1A2B4A',
        accent: '#0057FF'
    }
}

export const COMMON_COLORS = {
    White: '#FFFFFF',
    Black: 'rgb(1,1,1)',
    Blue: '#3B82F6',
    Red: '#EF4444',
    LightRed: '#ff6157',
    DarkRed: 'rgba(239,68,68,0.45)',
    LightDarkRed: 'rgba(239,68,68,0.10)',
    LightBlue: '#b5cbf8e0',
    Gray: 'rgb(132,132,132)',
    LightGray: '#e8e8eed5',
    Orange: 'rgb(237,129,20)',
    LightDarkishWhite: '#EEF2F7',
    LightWhite: 'rgb(209,205,205,0.938)',
    grayishDark: 'rgb(145,145,145)',
    grayishWhite: 'rgb(128,128,128)',
    Yellow: '#FACC15'

}

//  FONT SIZE, FONT FAMILY, ANIMATION AND ANIMATIOn SPEED
export const AnimationSpeedAndType = [
    {
        Name: 'Normal',
        Speed: '450ms',
        icon: 'Gauge',
        RefreshRate: '60 Hz',
        Description: 'Smooth and fluid for the best experience.'
    },
    {
        Name: 'Faster',
        Speed: '300ms',
        icon: 'Rabbit',
        RefreshRate: '90 Hz',
        Description: 'Fast animation for better experinece.'
    },
    {
        Name: 'Disabled',
        Speed: '0s',
        RefreshRate: 'Default',
        icon: 'CircleOff',
        Description: 'Disable all animations for maximum performace.'
    }
]
export const AnimationsName = [

    {
        Name: 'Smooth',
        Animation: 'sine.inOut',
        icon: 'LineSquiggle',
        description: 'Gentle acceleration and deceleration for natural motion.'
    },
    {
        Name: 'Expo Out',
        Animation: 'expo.out',
        icon: 'TrendingUp',
        description: 'Very fast start with a smooth finish.'
    },
    {
        Name: 'Back Out',
        Animation: 'back.out(3)',
        icon: 'Redo',
        description: 'Slightly overshoots before setting into place.'
    },
    {
        Name: 'Ease ',
        Animation: 'power2.out',
        icon: 'MoveRight',
        description: 'Starts quickly and slows before stopping.'
    },
    // {
    //     Name: 'Elastic Out',
    //     Animation: 'elastic.out(1,0.3)',
    //     icon: 'CctvIcon',
    //     description: 'Springs past the target.'
    // }
]

export const CSS_EASING = {
    'sine.inOut': 'cubic-bezier(0.455, 0.05, 0.55, 0.95)',
    "expo.out": 'cubic-bezier(0.19, 1, 0.22, 1)',
    "back.out(3)": 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'power2.out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
}

export const FONT_FAMILY = [
    {
        Name: 'System Default',
        Description: "Matches your device's native font.",
        Weights: {
            Regular: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            SemiBold: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            Bold: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            ExtraBold: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        }
    },
    {
        Name: 'Plus Jakarta Sans',
        Description: 'A sleek, modern typeface and easy to read. ',
        Weights: {
            Regular: 'PlusSansRegular',
            SemiBold: 'PlusSansSemiBold',
            Bold: 'PlusSansBold',
            ExtraBold: 'PlusSansExtraBold'
        }
    },
    {
        Name: 'Poppins',
        Description: 'A rounded, geometric font with a friendly readability.',
        Weights: {
            Regular: 'PoppinsRegular',
            SemiBold: 'PoppinsSemiBold',
            Bold: 'PoppinsBold',
            ExtraBold: 'PoppinsExtraBold'
        }
    }
]

export const FONT_SIZES = [
    {
        SizeType: 'Large',
        Details: 'Larger font size than usual',
        Sizes: {
            ExtraLarge: '1.57rem',
            Large: '1.42rem',
            Regular: '1.27rem',
            Small: '0.87rem',
            ExtraSmall: '0.62rem'
        }
    },
    {
        SizeType: 'Default',
        Details: 'Usual font size',
        Sizes: {
            ExtraLarge: '1.5rem',
            Large: '1.35rem',
            Regular: '1.2rem',
            Small: '0.8rem',
            ExtraSmall: '0.55rem'
        }
    },
    {
        SizeType: 'Small',
        Details: 'Smaller font size than usual',
        Sizes: {
            ExtraLarge: '1.4rem',
            Large: '1.2rem',
            Regular: '1.05rem',
            Small: '0.7rem',
            ExtraSmall: '0.45rem'
        }
    }
]

// Name: 'LIGHT_THEME_COLORS',
// header: '#FFFFFF',
// bg: 'rgb(247, 248, 253)',
// primary: '#FFFFFF',
// sec: '#F3F4F6',
// third: 'rgb(233,233,235)',

// primaryText: 'rgb(1,1,1)',
// secText: '#666666',
// thirdText: '#8F8F8F',

// grayish: 'rgb(128,128,128)',
// blackBg: '#252525',
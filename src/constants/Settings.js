
// This file provide code of Settings options,sections and all about settings section only 

export const SETTING_SECTIONS = [
    {
        id: 'General',
        title: 'General',
        description: 'App preferences & startup',
        icon: 'Settings',
        options: [
            {
                id: 'startup-behaviour',
                type: 'select',
                label: 'Startup behaviour',
                description: 'Choose what to open when you launch the app.',
                value: 'Home',
                options: [
                    { label: 'Home', value: 'Home', icon: 'Home' },
                    { label: 'Assets', value: 'Assets', icon: 'Component' },
                    { label: 'Projects', value: 'Projects', icon: 'FolderKanban' },
                    { label: 'Profile', value: 'Profile', icon: 'User' }
                ]

            },
            {
                id: 'control-language',
                type: 'select',
                label: 'Language',
                description: 'Select your preferred language.',
                value: 'English',
                options: [
                    { label: 'English', value: 'English', icon: 'Globe' },
                    { label: 'Hindi', value: 'Hindi', icon: 'Globe' },
                ]
            },
        ]
    },
    {
        id: 'Appearance',
        title: 'Appearance',
        description: 'Theme, colors & interface',
        icon: 'Palette',
        options: [
            {
                id: 'theme-change',
                type: 'multi-button',
                label: 'Theme',
                description: 'Choose the appearance of Visual UI.',
                value: 'light',
                options: [
                    {
                        label: "Light", value: 'Light', icon: ''
                    },
                    {
                        label: "Dark", value: 'Dark', icon: ''
                    }
                ]
            },
            {
                id: 'accent-color',
                type: 'color',
                label: 'Accent color',
                description: 'Choose the primary color used throughout the interface.',
                value: 'Purple',
                options: [
                    {
                        COLOR: 'Blue',
                        CODE: '#3B82F6',
                    },
                    {
                        COLOR: 'Red',
                        CODE: '#EF4444',
                    },
                    {
                        COLOR: 'Purple',
                        CODE: '#7C3AED',
                    },
                    {
                        COLOR: 'Magenta',
                        CODE: '#D52DEB',
                    },
                    {
                        COLOR: 'Yellow',
                        CODE: '#FACC15',
                    },
                    {
                        COLOR: 'Lime',
                        CODE: '#84CC16',
                    },
                    {
                        COLOR: 'Green',
                        CODE: 'rgb(38, 165, 22)',
                    },
                    {
                        COLOR: 'Cyan',
                        CODE: '#22D3EE',
                    },
                    {
                        COLOR: 'Slate_Gray',
                        CODE: '#94A3B8',
                    },
                    {
                        COLOR: 'Orange',
                        CODE: 'rgb(237,129,20)',
                    }
                ]
            },
            {
                id: 'font-size',
                type: 'stepper',
                label: 'Font sizes',
                description: 'Choose your preferred font size.',
                value: 'Default',
                options: [
                    { label: 'Small', value: 'Small', },
                    { label: 'Default', value: 'Default', },
                    { label: 'Large', value: 'Large', },
                ]
            },
            {
                id: 'font-family',
                type: 'stepper',
                label: 'Font family',
                description: 'Choose your preferred font style.',
                value: 'System Default',
                options: [
                    { label: 'System', value: 'System Default', },
                    { label: 'Sans', value: 'Plus Jakarta Sans', },
                    { label: 'Poppins', value: 'Poppins', },
                ]
            },

        ]
    },
    {
        id: 'Canvas',
        title: 'Canvas',
        description: 'Workspace & navigation',
        icon: 'Image',
        options: [
            {
                id: 'show-grid',
                type: 'toggle',
                label: 'Show grid',
                description: 'Helps with alignment and spacing.',
                value: false,

            },

        ]
    },
    {
        id: 'Editor',
        title: 'Editor',
        description: 'Element behaviour & selection',
        icon: 'MousePointer',
        options: [
            {
                id: 'elem-delete-confirmation',
                type: 'toggle',
                label: 'Delete Confirmation',
                description: 'Ask for confirmation before permanently deleting an element.',
                options: []
            },
            {
                id: 'auto-select-newCreated-elem',
                type: 'toggle',
                label: 'Select new elements',
                description: 'Automatically select an element immidiately after creating it.',
                options: []
            }
        ]
    },
    // {
    //     id: 'Snapping & Guides',
    //     title: 'Snapping & Guides',
    //     description: 'Alignment & positioning',
    //     icon: 'Magnet',
    //     options: [
    //         {
    //             id: 'Theme & appearance',
    //             type: 'Theme & appearance',
    //             label: 'Theme & appearance',
    //             description: 'just random thing for now.',
    //             options: []
    //         }
    //     ]
    // },

    // {
    //     id: 'Shortcuts',
    //     title: 'Shortcuts',
    //     description: 'Keyboard shortcuts',
    //     icon: 'Keyboard',
    //     options: [
    //         {
    //             id: 'Theme & appearance',
    //             type: 'Theme & appearance',
    //             label: 'Theme & appearance',
    //             description: 'just random thing for now.',
    //             options: []
    //         }
    //     ]
    // },

    // {
    //     id: 'Responsive',
    //     title: 'Responsive',
    //     description: 'Breakpoints & device preview',
    //     icon: 'MonitorSmartphone',
    //     options: [
    //         {
    //             id: 'Theme & appearance',
    //             type: 'Theme & appearance',
    //             label: 'Theme & appearance',
    //             description: 'just random thing for now.',
    //             options: []
    //         }
    //     ]
    // },

    {
        id: 'Performance',
        title: 'Performance',
        description: 'Rendring  optimization',
        icon: 'Gauge',
        options: [
            {
                id: 'performance-mode',
                type: 'toggle',
                label: 'Performance mode',
                description: 'Reduce or disable shadows to improve rendring performance.',
                options: []
            },
            {
                id: 'reduce-animations',
                type: 'toggle',
                label: 'Reduce animations',
                description: 'Use simpler animations to reduce the amount of work required for rendering.',
                options: []
            },
        ]
    },

    // {
    //     id: 'Accessibility',
    //     title: 'Accessibility',
    //     description: 'Inclusive desgin',
    //     icon: 'PersonStanding',
    //     options: [
    //         {
    //             id: 'Theme & appearance',
    //             type: 'Theme & appearance',
    //             label: 'Theme & appearance',
    //             description: 'just random thing for now.',
    //             options: []
    //         }
    //     ]
    // },

    {
        id: 'Storage-&-Data',
        title: 'Storage & Data',
        description: 'Project persistence',
        icon: 'Database',
        options: [
            {
                id: 'auto-save',
                type: 'toggle',
                label: 'Auto save',
                description: 'Automatically save your work.',
                value: false,
            },
            {
                id: 'auto-save-interval',
                type: 'stepper',
                label: 'Auto save interval',
                description: 'Choose when to automatically saves your changes.',
                value: '',
                options: [
                    { label: '1 min', value: 60, },
                    { label: '2 min', value: 120, },
                    { label: '5 min', value: 300, },
                    { label: '10 min', value: 600, }
                ]

            },
            {
                id: 'reset-all-settings',
                type: 'action-button',
                label: 'Reset all settings',
                description: 'Restore Visual UI settings to their original defaults.',
                value: 'Reset settings',
            },
        ]
    },
    {
        id: 'Experimental',
        title: 'Experimental',
        description: 'Future Features',
        icon: 'FlaskConical',
        options: [
            {
                id: 'enable-experimental-features',
                type: 'toggle',
                label: 'Enable experimental features',
                description: 'Enable features that are still being tested and may change over time.',
                value: false,
            },
        ]
    },
    {
        id: 'About',
        title: 'About',
        description: 'Version & information',
        icon: 'Info',
        options: [
            {
                id: 'about',
                type: 'about',
                label: '',
                description: '.',
                value: '',
            },
        ]
    },
]


// Initially all settings
export const INITIAL_SETTINGS = {
    'General': {
        'startup-behaviour': 'Home',
        'control-language': 'English'
    },
    'Appearance': {
        'accent-color': 'Purple'
    },
    'Canvas': {
        'show-grid': false
    },
    'Editor': {
        'elem-delete-confirmation': false,
        'auto-select-newCreated-elem': true
    },
    'Performance': {
        'performance-mode': false,
        'reduce-animations': false
    },
    'Storage-&-Data': {
        'auto-save': true,
        'auto-save-interval': 60,//in seconds only,
        'reset-all-settings': null
    },
    'Experimental': {
        'enable-experimental-features': false
    }
}

//
// options: [
// {
// id: '',
// type: '', // select,toggle button, < > buttons
// description: '',
// }
// ]
import { Blend, Bold, Check, Maximize2, Palette, Pencil,  Type } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { ACCENT_COLORS, COMMON_COLORS, FONT_FAMILY, THEMES } from '../../../../constants/style'
import { useState } from 'react'
import { updateAddedElementInProject } from '../../../../store/features/Canvas'

const TextChange = {
    label: 'Text Content',
    description: 'Change what your text says.',
    MaxLength: 100
}
const FontSizeChange = {
    label: 'Font Size',
    description: 'Adjust the size of your text.',
    MaxSize: 100,
    MinSize: 5
}
const OpacityChange = {
    label: 'Opacity',
    description: 'Adjust the transparency of your text.',
    MaxSize: 100,
    MinSize: 0
}

const ColorChange = {
    label: 'Text Color',
    description: 'Choose the color for your text.',
}


const TextSelectControls = () => {

    const dispatch = useDispatch();
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const { Name: FontName } = useSelector(store => store.Preferences.Font)
    const Theme = useSelector((store) => store.Preferences.Theme)
    const AccentColor = useSelector((store) => store.systemSlice.Settings['Appearance']['accent-color'])
    const activeProject = useSelector((store) => store.Canvas.WorkingProject)

    const FontWeightChange = {
        label: 'Font Weight',
        description: 'Make your text lighter or bolder.',
        Values: [
            {
                Weight: 'Regular',
                Value: FONT_FAMILY.find(({ name }) => name === FontName)?.['Weights']['Regular']
            },
            {
                Weight: 'SemiBold',
                Value: FONT_FAMILY.find(({ name }) => name === FontName)?.['Weights']['SemiBold']
            },
            {
                Weight: 'Bold',
                Value: FONT_FAMILY.find(({ name }) => name === FontName)?.['Weights']['Bold']
            },
            {
                Weight: 'ExtraBold',
                Value: FONT_FAMILY.find(({ name }) => name === FontName)?.['Weights']['ExtraBold']
            },
        ]
    }

    // selected Element, currently activeElement is used to determine which element is selected in the canvas.
    const selectedElement = useSelector((store) => store.Canvas.selectedElement)
    const size = selectedElement.styles.fontSize || Sizes.Regular;

    // states
    const [InputVal, setInputVal] = useState(selectedElement.content || '')
    const [FontSize, setFontSize] = useState(Math.floor(Number(size.slice(0, -3)) * 16) || 18);
    const [FontWeightName, setFontWeightName] = useState(selectedElement.styles.fontWeightName || 'Regular')
    const [Opacity, setOpacity] = useState(selectedElement.styles.opacity * 100 || 100)
    const [selectedColor, setSelectedColor] = useState(selectedElement.styles.color || Theme.primaryText)


    // constant for color
    const suggestedColors = [
        {
            color: selectedColor
        },
        {
            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE || '#3B82F6'
        },
        {
            color: THEMES['Dark']?.header || '#252525'
        },
        {
            color: THEMES['Light']?.third || '#D6E5FF'
        },
        {
            color: ACCENT_COLORS?.find(({ COLOR }) => COLOR === AccentColor)?.CODE
        },
        {
            color: THEMES["Light"]?.grayish || '#8A94A6'
        },
    ]


    return (
        <div
            style={{
                borderColor: Theme.third
            }}
            className={`flex flex-col gap-3`}
        >

            {/* text change */}
            <div
                style={{
                    borderColor: Theme.third
                }}
                className={`relative border rounded-2xl  flex flex-col gap-3 px-[5%] py-3 `}>

                <div className={`flex items-center gap-2`}>
                    <p
                        style={{
                            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).Bg_Clr,
                            borderColor: Theme.third,
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE
                        }}
                        className={`p-1.5 border aspect-square h-full rounded-lg`}>
                        <Type size={18} strokeWidth={2.5} />
                    </p>
                    <p className={`flex flex-col gap-0.5`} >
                        <span
                            style={{
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-bold`}
                        >{TextChange.label}
                        </span>

                        <span
                            style={{
                                color: Theme.secText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.78}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-semibold`}
                        >{TextChange.description}
                        </span>
                    </p>
                </div>

                <input
                    spellCheck={false}
                    value={InputVal}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        const max = TextChange.MaxLength;

                        // Only update state if the length falls within your limit
                        if (max === undefined || max === null || newValue.trim().length <= max) {
                            dispatch(updateAddedElementInProject({
                                projectId: activeProject.id,
                                elemCode: selectedElement.uniqueCode,
                                updatedElement: { ...selectedElement, content: [newValue] }
                            }))
                            setInputVal(newValue);
                        }
                    }}
                    type="text"
                    maxLength={TextChange.MaxLength}
                    placeholder='Enter your text here'
                    style={{
                        borderColor: Theme.third,
                        color: Theme.primaryText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                        fontFamily: Weights.SemiBold
                    }}
                    className={`font-semibold border rounded-xl px-2 pt-1.5 pb-6 w-full outline-none`}
                />

                {/*  characters count and remaining */}
                <p style={{
                    color: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE,
                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
                    fontFamily: Weights.SemiBold
                }} className={`font-semibold absolute right-7 bottom-4`}>
                    {InputVal.length}/{TextChange.MaxLength}
                </p>
            </div>

            {/* font size change */}
            <div
                style={{
                    borderColor: Theme.third
                }}
                className={`relative border rounded-2xl  flex flex-col gap-3 px-[5%] py-3 `}>

                <div className={`flex items-center gap-2`}>
                    <p
                        style={{
                            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).Bg_Clr,
                            borderColor: Theme.third,
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE
                        }}
                        className={`p-1.5 border aspect-square h-full rounded-lg`}>
                        <Maximize2 size={18} strokeWidth={2.5} />
                    </p>
                    <p className={`flex flex-col gap-0.5`} >
                        <span
                            style={{
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-bold`}
                        >{FontSizeChange.label}
                        </span>

                        <span
                            style={{
                                color: Theme.secText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.78}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-semibold`}
                        >{FontSizeChange.description}
                        </span>
                    </p>
                </div>
                <div className={`flex gap-4 items-center`}>
                    <input
                        type="range"
                        id='ranger'
                        min={FontSizeChange.MinSize}
                        max={FontSizeChange.MaxSize}
                        value={FontSize}
                        step={1}
                        onChange={(e) => {
                            dispatch(updateAddedElementInProject({
                                projectId: activeProject.id,
                                elemCode: selectedElement.uniqueCode,
                                updatedElement: {
                                    ...selectedElement,
                                    styles: { ...selectedElement.styles, fontSize: `${Number(e.target.value) / 16}rem` }
                                }
                            }))

                            setFontSize(Number(e.target.value))
                        }}
                        className={`w-full outline-none`
                        }
                    />

                    <p
                        style={{
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE,
                            backgroundColor: Theme.bg,
                            borderColor: Theme.third,
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                            fontFamily: Weights.Bold
                        }}
                        className={`px-1 py-0.5 font-bold w-20 text-center border rounded-xl`}>{FontSize}px</p>
                </div>

            </div>

            {/*  font weight */}
            <div
                style={{
                    borderColor: Theme.third
                }}
                className={`relative border rounded-2xl  flex flex-col gap-3 px-[5%] py-3 `}
            >

                <div className={`flex items-center gap-2`}>
                    <p
                        style={{
                            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).Bg_Clr,
                            borderColor: Theme.third,
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE
                        }}
                        className={`p-1.5 border aspect-square h-full rounded-lg`}>
                        <Bold size={18} strokeWidth={2.5} />
                    </p>
                    <p className={`flex flex-col gap-0.5`} >
                        <span
                            style={{
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-bold`}
                        >{FontWeightChange.label}
                        </span>

                        <span
                            style={{
                                color: Theme.secText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.78}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-semibold`}
                        >{FontSizeChange.description}
                        </span>
                    </p>
                </div>
                <div
                    className={`w-full grid grid-cols-2 gap-2`}>
                    {FontWeightChange?.Values?.map(({ Weight, Value }) => {
                        return <button
                            key={Weight}
                            onClick={() => {
                                const AllValues = {
                                    'Regular': 400,
                                    'SemiBold': 600,
                                    'Bold': 700,
                                    'ExtraBold': 900
                                }
                                const PassedValue = FontName === 'System Default' ? AllValues[Weight] : Value

                                dispatch(updateAddedElementInProject({
                                    projectId: activeProject.id,
                                    elemCode: selectedElement.uniqueCode,
                                    updatedElement: {
                                        ...selectedElement,
                                        styles: { ...selectedElement.styles, fontWeight: PassedValue, fontWeightName: Weight }
                                    }
                                }))
                                setFontWeightName(Weight)
                            }}
                            style={{
                                fontSize: Sizes.Small,
                                fontFamily: Weights.SemiBold,

                                color: Weight === FontWeightName ? ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE : Theme.primaryText,

                                backgroundColor: Weight === FontWeightName ? ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).Bg_Clr : '',

                                borderColor: Weight === FontWeightName ? ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE : Theme.third
                            }}
                            className={`font-semibold border rounded-lg py-1.5 px-0.5`}
                        >
                            {Weight}
                        </button>
                    })}
                </div>
            </div>

            {/* opacity */}
            <div
                style={{
                    borderColor: Theme.third
                }}
                className={`relative border rounded-2xl  flex flex-col gap-3 px-[5%] py-3 `}>

                <div className={`flex items-center gap-2`}>
                    <p
                        style={{
                            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).Bg_Clr,
                            borderColor: Theme.third,
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE
                        }}
                        className={`p-1.5 border aspect-square h-full rounded-lg`}>
                        <Blend size={18} strokeWidth={2.5} />
                    </p>
                    <p className={`flex flex-col gap-0.5`} >
                        <span
                            style={{
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-bold`}
                        >{OpacityChange.label}
                        </span>

                        <span
                            style={{
                                color: Theme.secText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.78}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-semibold`}
                        >{OpacityChange.description}
                        </span>
                    </p>
                </div>
                <div className={`flex gap-4 items-center`}>
                    <input
                        type="range"
                        id='ranger'
                        min={OpacityChange.MinSize}
                        max={OpacityChange.MaxSize}
                        value={Opacity}
                        step={1}
                        onChange={(e) => {
                            dispatch(updateAddedElementInProject({
                                projectId: activeProject.id,
                                elemCode: selectedElement.uniqueCode,
                                updatedElement: {
                                    ...selectedElement,
                                    styles: { ...selectedElement.styles, opacity: `${Number(e.target.value) / 100}` }
                                }
                            }))

                            setOpacity(Number(e.target.value))
                        }}
                        className={`w-full outline-none`
                        }
                    />

                    <p
                        style={{
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE,
                            backgroundColor: Theme.bg,
                            borderColor: Theme.third,
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                            fontFamily: Weights.Bold
                        }}
                        className={`px-1 py-0.5 font-bold w-20 text-center border rounded-xl`}>{Opacity}%</p>
                </div>

            </div>

            {/* text color change */}
            <div
                style={{
                    borderColor: Theme.third
                }}
                className={`relative border rounded-2xl  flex flex-col gap-3 px-[5%] py-3 `}
            >

                <div className={`flex items-center gap-2`}>
                    <p
                        style={{
                            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).Bg_Clr,
                            borderColor: Theme.third,
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE
                        }}
                        className={`p-1.5 border aspect-square h-full rounded-lg`}>
                        <Palette size={18} strokeWidth={2.5} />
                    </p>
                    <p className={`flex flex-col gap-0.5`} >
                        <span
                            style={{
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-bold`}
                        >{ColorChange.label}
                        </span>

                        <span
                            style={{
                                color: Theme.secText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.78}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-semibold`}
                        >{ColorChange.description}
                        </span>
                    </p>
                </div>
                <div
                    className={`w-full flex flex-col gap-3 `}>
                    <div className={`grid grid-cols-6 gap-3`}>
                        {suggestedColors.length > 0 && suggestedColors.map(({ color: colorCODE }, idx) => {
                            return <button
                                onClick={() => {
                                    if (colorCODE !== selectedElement.styles.color) {
                                        dispatch(updateAddedElementInProject({
                                            projectId: activeProject.id,
                                            elemCode: selectedElement.uniqueCode,
                                            updatedElement: {
                                                ...selectedElement,
                                                styles: { ...selectedElement.styles, color: colorCODE }
                                            }
                                        }))
                                    }
                                    setSelectedColor(colorCODE)
                                }}
                                style={{
                                    borderColor: idx === 0 && selectedColor === colorCODE ? colorCODE : 'transparent'
                                }}
                                className={`p-0.5 aspect-square rounded-full w-full border-2`}>
                                <p
                                    style={{
                                        backgroundColor: colorCODE,
                                        color: COMMON_COLORS.White
                                    }} className={`flex items-center justify-center aspect-square rounded-full w-full`}>
                                    {selectedColor === colorCODE && idx === 0 && < Check size={16} strokeWidth={2.5} />}
                                </p>
                            </button>
                        })}
                    </div>


                    <label
                        style={{
                            cursor: 'pointer',
                            borderColor: Theme.third
                        }}
                        className={`px-3 py-2 border rounded-2xl flex items-center gap-3`}
                    >
                        <Palette style={{ color: Theme.primaryText }} strokeWidth={2} vsize={25} />

                        <p className={`flex flex-col gap-0.5`}>
                            <span
                                style={{
                                    color: Theme.primaryText,
                                    fontSize: Sizes.Small,
                                    fontFamily: Weights.SemiBold
                                }} className={`font-semibold`}
                            >Custom Colour</span>
                            <span
                                style={{
                                    color: Theme.primaryText,
                                    fontSize: Sizes.ExtraSmall,
                                    fontFamily: Weights.Regular
                                }}
                            >Pick a custom colour that reflects your style.</span>
                        </p>

                        <div
                            style={{
                                borderColor: Theme.third,
                                backgroundColor : selectedColor
                            }}
                            className={`border relative rounded-full overflow-hidden aspect-square`}>
                            <input
                                type="color"
                                value={selectedColor}
                                onChange={(e) => {
                                        dispatch(updateAddedElementInProject({
                                            projectId: activeProject.id,
                                            elemCode: selectedElement.uniqueCode,
                                            updatedElement: {
                                                ...selectedElement,
                                                styles: { ...selectedElement.styles, color: e.target.value }
                                            }
                                        }))
                                        setSelectedColor(e.target.value)
                                    
                                }}
                                style={{ cursor: 'pointer', border: 'none', background: 'none', width: '40px', height: '40px', outline: 'none' }}
                                className={`overflow-hidden aspect-square`}
                            />
                            <Pencil strokeWidth={1.5} style={{ color: COMMON_COLORS.White }} size={16} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />

                        </div>

                    </label>

                </div>
            </div>

        </div>
    )
}

export default TextSelectControls
import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ACCENT_COLORS, COMMON_COLORS, THEMES } from '../../../constants/style';
import { Check, Palette, Pencil } from 'lucide-react';
import { updateAddedElementInProject } from '../../../store/features/Canvas';

const ColorChange = {
    label: 'Change Color',
    description: 'Choose the color for your element.',
}

const Color = () => {

    const dispatch = useDispatch();
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const { Name: FontName } = useSelector(store => store.Preferences.Font)
    const Theme = useSelector((store) => store.Preferences.Theme)
    const AccentColor = useSelector((store) => store.systemSlice.Settings['Appearance']['accent-color'])
    const activeProject = useSelector((store) => store.Canvas.WorkingProject)

    // selected Element, currently activeElement is used to determine which element is selected in the canvas.
    const selectedElement = useSelector((store) => store.Canvas.selectedElement)

    // states
    const [selectedColor, setSelectedColor] = useState(selectedElement.styles.color || Theme.primaryText)
    const [selectedProperty, setSelectedProperty] = useState('color') // can be 'color' , 'BackgroundColor','borderColor'

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
    const FallbackOfColors = {
        'color': Theme.primaryText,
        'backgroundColor': '',
        'borderColor': Theme.primaryText
    }
    return (
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
                                if (colorCODE !== selectedElement.styles[selectedProperty]) {
                                    dispatch(updateAddedElementInProject({
                                        projectId: activeProject.id,
                                        elemCode: selectedElement.uniqueCode,
                                        updatedElement: {
                                            ...selectedElement,
                                            styles: { ...selectedElement.styles, [selectedProperty]: colorCODE }
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
                            backgroundColor: selectedColor || Theme.primaryText
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
                                        styles: { ...selectedElement.styles, [selectedProperty]: e.target.value }
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

                <div className={`mt-1 w-full flex items-center justify-center gap-1.5`}>
                    <span
                        style={{
                            color: Theme.primaryText,
                            fontSize: `${(Sizes.ExtraSmall.slice(0, -3)) * 1.2}rem`,
                            fontFamily: Weights.SemiBold
                        }}
                        className={`shrink-0 font-semibold`}
                    >Apply To : </span>
                    <div className={`grow grid grid-cols-3 gap-2`}>
                        {
                            [
                                { Property: 'Color', searchFor: 'color' },
                                { Property: 'Bg', searchFor: 'backgroundColor' },
                                { Property: 'Border', searchFor: 'borderColor' }].map(({ Property, searchFor }) => {
                                    return <button
                                        key={Property}
                                        onClick={() => {
                                            setSelectedProperty(searchFor)
                                            setSelectedColor(selectedElement.styles[searchFor] || FallbackOfColors[searchFor])
                                        }}
                                        style={{
                                            color: selectedProperty === searchFor ? ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE : Theme.primaryText,
                                            backgroundColor: selectedProperty === searchFor ? ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).Bg_Clr : '',
                                            borderColor: selectedProperty === searchFor ? ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE : Theme.third,
                                            fontSize: Sizes.Small,
                                            fontFamily: Weights.Bold
                                        }} className={`font-bold border py-1.5 rounded-2xl overflow-hidden text-center`}
                                    >{Property}
                                    </button>
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Color
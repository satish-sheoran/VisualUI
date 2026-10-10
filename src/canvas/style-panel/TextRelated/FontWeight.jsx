import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Bold } from 'lucide-react';
import { ACCENT_COLORS, FONT_FAMILY } from '../../../constants/style';
import { updateAddedElementInProject } from '../../../store/features/Canvas';

const FontWeight = () => {

    const dispatch = useDispatch();
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const AccentColor = useSelector((store) => store.systemSlice.Settings['Appearance']['accent-color'])
    const activeProject = useSelector((store) => store.Canvas.WorkingProject)
    const { Name: FontName } = useSelector(store => store.Preferences.Font)


    // selected Element, currently activeElement is used to determine which element is selected in the canvas.
    const selectedElement = useSelector((store) => store.Canvas.selectedElement)

    // states
    const [FontWeightName, setFontWeightName] = useState(selectedElement.styles.fontWeightName || 'Regular')

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
                    >{FontWeightChange.description}
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
    )
}

export default FontWeight
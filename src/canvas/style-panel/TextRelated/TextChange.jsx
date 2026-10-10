import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Type } from 'lucide-react';
import { updateAddedElementInProject } from '../../../store/features/Canvas';
import { ACCENT_COLORS } from '../../../constants/style';

const TxtChange = {
    label: 'Text Content',
    description: 'Change what your text says.',
    MaxLength: 100
}

const TextChange = () => {

    const dispatch = useDispatch();
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const AccentColor = useSelector((store) => store.systemSlice.Settings['Appearance']['accent-color'])
    const activeProject = useSelector((store) => store.Canvas.WorkingProject)

    // selected Element, currently activeElement is used to determine which element is selected in the canvas.
    const selectedElement = useSelector((store) => store.Canvas.selectedElement)

    // states
    const [InputVal, setInputVal] = useState(selectedElement.content || '')


    return (
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
                    >{TxtChange.label}
                    </span>

                    <span
                        style={{
                            color: Theme.secText,
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 0.78}rem`,
                            fontFamily: Weights.SemiBold
                        }} className={`font-semibold`}
                    >{TxtChange.description}
                    </span>
                </p>
            </div>

            <input
                spellCheck={false}
                value={InputVal}
                onChange={(e) => {
                    const newValue = e.target.value;
                    const max = TxtChange.MaxLength;

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
                maxLength={TxtChange.MaxLength}
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
                {InputVal.length}/{TxtChange.MaxLength}
            </p>
        </div>
    )
}

export default TextChange
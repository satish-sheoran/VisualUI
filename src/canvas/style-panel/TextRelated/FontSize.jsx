import  { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { ACCENT_COLORS } from '../../../constants/style'
import { updateAddedElementInProject } from '../../../store/features/Canvas'


const FontSizeChange = {
    label: 'Font Size',
    description: 'Adjust the size of your text.',
    MaxSize: 100,
    MinSize: 5
}

const FontSize = () => {

    const dispatch = useDispatch();
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const AccentColor = useSelector((store) => store.systemSlice.Settings['Appearance']['accent-color'])
    const activeProject = useSelector((store) => store.Canvas.WorkingProject)

    // selected Element, currently activeElement is used to determine which element is selected in the canvas.
    const selectedElement = useSelector((store) => store.Canvas.selectedElement)
    const size = selectedElement.styles.fontSize || Sizes.Regular;

    // states
    const [FontSize, setFontSize] = useState(Math.floor(Number(size.slice(0, -3)) * 16) || 18);

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
    )
}

export default FontSize
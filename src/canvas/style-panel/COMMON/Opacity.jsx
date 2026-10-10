import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ACCENT_COLORS } from '../../../constants/style';
import { Blend } from 'lucide-react';
import { updateAddedElementInProject } from '../../../store/features/Canvas';

const OpacityChange = {
    label: 'Opacity',
    description: 'Adjust the transparency of your text.',
    MaxSize: 100,
    MinSize: 0
}

const Opacity = () => {

    const dispatch = useDispatch();
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const AccentColor = useSelector((store) => store.systemSlice.Settings['Appearance']['accent-color'])
    const activeProject = useSelector((store) => store.Canvas.WorkingProject)

    // selected Element, currently activeElement is used to determine which element is selected in the canvas.
    const selectedElement = useSelector((store) => store.Canvas.selectedElement)

    // states
    const [Opacity, setOpacity] = useState(selectedElement.styles.opacity * 100 || 100)


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

        </div>)
}

export default Opacity
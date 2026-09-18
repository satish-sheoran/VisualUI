// This file write code of a toggle button and currently only availbale for settings toggle buttons only

import { useDispatch, useSelector } from "react-redux";
import { ACCENT_COLORS, COMMON_COLORS, CSS_EASING } from "../../constants/style";
import { updateSetting } from "../../store/features/systemSlice";
import { toast } from "react-toastify";


const Toggle = ({ toggle, parentSettingSection }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
    const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
    const isEnable = useSelector(store => store.systemSlice.Settings[parentSettingSection]
        ?.[toggle?.id])

    const performAction = (Section, option, val) => {
        dispatch(updateSetting({ SettingSection: Section, option, value: val }))
    }

    return (
        <div
            style={{
                borderColor: Theme.third,
                backgroundColor: Theme.sec
            }}
            className={`w-full flex items-center justify-between gap-4 px-3 py-2.5 rounded-2xl`}>
            {/* label and description */}
            <div className={`max-w-7/10 flex flex-col gap-0.5 `}>
                <p
                    style={{
                        color: Theme.primaryText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                        fontFamily: Weights.SemiBold
                    }} className={`font-semibold`}
                >{toggle?.label}</p>
                <span
                    style={{
                        color: Theme.secText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                        fontFamily: Weights.SemiBold
                    }} className={`font-semibold`}
                >{toggle?.description}</span>
            </div>

            <button
                onClick={() => performAction(parentSettingSection, toggle?.id, isEnable ? false : true)}
                style={{
                    backgroundColor: isEnable ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Green').CODE :
                        Theme.bg,
                    borderColor: Theme.third
                }}
                className={`shrink-0 border outline-none cursor-pointer relative  w-14 h-7 p-1.5  rounded-full `}>

                <div style={{
                    backgroundColor: COMMON_COLORS.White,
                    borderColor: Theme.third,
                    transition: `transform ${Speed} ${CSS_EASING[Animation]}`,
                    transform: `${isEnable ? 'translateX(1.43rem)' : 'translateX(0)'}`
                }} className={`border w-5 h-5 absolute top-[0.2rem] rounded-full 
                    `}></div>

            </button>

        </div>
    )
}

export default Toggle
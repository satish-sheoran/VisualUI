// this file gives code of option/settings of only Setting section having multiple options and only one option can be checked at a time

import { useDispatch, useSelector } from "react-redux";
import * as ICONS from 'lucide-react'
import { ACCENT_COLORS, COMMON_COLORS } from "../../constants/style";
import { toast } from "react-toastify";
import { updateSetting } from "../../store/features/systemSlice";
import { updateTheme } from "../../store/features/DevicePreferences";

const MultiButton = ({ parentSettingSection, MultiButton }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const MultiButtonVal = useSelector(store => MultiButton?.id === 'theme-change' ? store.Preferences.Theme.Theme : store.systemSlice.Settings[parentSettingSection]
        ?.[MultiButton?.id])

    const performAction = (Section, option, val) => {
        if (option === 'theme-change') {
            dispatch(updateTheme({ newTheme: val }))
            return;
        }
        dispatch(updateSetting({ SettingSection: Section, option, value: val }))
    }

    return (
        <div
            style={{
                borderColor: Theme.third,
                backgroundColor: Theme.sec
            }}
            className={`border px-3 py-2.5 w-full flex flex-col gap-2 rounded-2xl`}
        >
            {/* label and description */}
            <div className={`flex flex-col gap-0.5`}>
                <p
                    style={{
                        color: Theme.primaryText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                        fontFamily: Weights.SemiBold
                    }} className={`font-semibold`}
                >{MultiButton?.label}</p>
                <span
                    style={{
                        color: Theme.secText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                        fontFamily: Weights.SemiBold
                    }} className={`font-semibold`}
                >{MultiButton?.description}</span>
            </div>

            <div
                style={{ borderColor: Theme.third, backgroundColor: Theme.header }}
                className={`relative border rounded-xl overflow-hidden  grid ${MultiButton?.options.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'} px-2 py-2 gap-2`}>
                {MultiButton?.options.map((item) => {

                    return <div
                        key={item?.label}
                        className={`flex flex-col items-center justify-center rounded-xl`}
                    >
                        <div onClick={() => performAction(parentSettingSection, MultiButton?.id, item?.value)} className={`flex flex-col items-center justify-center gap-1 rounded p-1`}>
                            <p
                                style={{
                                    color: Theme.primaryText,
                                    fontFamily: Weights.SemiBold,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1.15}rem`
                                }}
                                className={`font-semibold`}
                            >
                                {item?.label}
                            </p>
                            <button
                                style={{
                                    backgroundColor: MultiButtonVal === item?.label ?
                                        ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Green').CODE
                                        : Theme.bg,
                                    color: COMMON_COLORS.White,
                                    borderColor: Theme.third
                                }}
                                className={`border w-5 h-5 rounded-full overflow-hidden flex items-center justify-center`}>
                                {MultiButtonVal === item?.label && <ICONS.Check size={12} strokeWidth={3} />}
                            </button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default MultiButton
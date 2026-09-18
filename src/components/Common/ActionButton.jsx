// this fn write code of action button whose work is done just by pressing it, for now it is written only for settings's action buttons 

import { useDispatch, useSelector } from 'react-redux';
import { ACCENT_COLORS, COMMON_COLORS } from '../../constants/style'
import { ResetSettings } from '../../store/features/systemSlice';
import {setDefault} from '../../store/features/DevicePreferences'
const ActionButton = ({ ActionButtonIfo, parentSettingSection }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    
    const performAction = (Section, option, val) => {
        if(option ==='reset-all-settings'){
            dispatch(ResetSettings())
            dispatch(setDefault())
            return;
        }
        // dispatch(updateSetting({ SettingSection: Section, option, value: val }))
    }

    return (
        <div
            style={{
                borderColor: Theme.third,
                backgroundColor: Theme.sec
            }}
            className={`border px-3 py-2.5 w-full flex items-center justify-between gap-2 rounded-2xl`}
        >
            {/* label and description */}
            <div className={`max-w-[60%] flex flex-col gap-0.5`}>
                <p
                    style={{
                        color: Theme.primaryText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                        fontFamily: Weights.SemiBold
                    }}
                    className={`font-semibold`}
                >{ActionButtonIfo?.label}</p>
                <span
                    style={{
                        color: Theme.secText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                        fontFamily: Weights.SemiBold
                    }}
                    className={`font-semibold`}
                >{ActionButtonIfo?.description}</span>
            </div>

            <button
            onClick={()=> performAction(parentSettingSection,ActionButtonIfo?.id,ActionButtonIfo?.value)}
                style={{
                    color: COMMON_COLORS.White,
                    fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.65}rem`,
                    fontFamily: Weights.Bold,
                    backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').Hover_Clr,
                    borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').CODE,

                }}
                className={`border font-bold px-2 py-1.5 active:scale-95 rounded-2xl h-fit`}>{ActionButtonIfo?.value}</button>
        </div>

    )
}

export default ActionButton
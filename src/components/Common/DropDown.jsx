// This file write code for any dropdown/select tag and the required informations should be provided to it during call
// This file writes code only for Setting's DropDown Only

import * as ICONS from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSetting } from '../../store/features/systemSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const DropDown = ({ dropDown, parentSettingSection }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const dropDownVal = useSelector(store => store.systemSlice.Settings[parentSettingSection]
        ?.[dropDown?.id])

    const performAction = (Section, option, val) => {
        dispatch(updateSetting({ SettingSection: Section, option, value: val }))
    }

    return (
        <div
        style={{
            borderColor : Theme.third,
            backgroundColor : Theme.sec
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
                >{dropDown?.label}</p>
                <span
                    style={{
                        color: Theme.secText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                        fontFamily: Weights.SemiBold
                    }} className={`font-semibold`}
                >{dropDown?.description}</span>
            </div>

            <div style={{ borderColor: Theme.third, backgroundColor: Theme.header }} className={`relative border rounded-xl overflow-hidden`}>
                <select
                    value={dropDownVal ?? ''}
                    onChange={(e) => performAction(parentSettingSection, dropDown?.id, e.target.value)}
                    style={{
                        color: Theme.primaryText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}`,
                        fontFamily: Weights.SemiBold,
                    }}
                    className={`font-semibold focus:outline-none focus:border-none appearance-none rounded-2xl w-full px-2 py-2`}
                >
                    {dropDown?.options.map((item) => {

                        return <option
                            key={item?.label}
                            value={item?.value}
                        >
                            {item?.label}
                        </option>
                    })}
                </select>
                <ICONS.ChevronDown
                style={{
                    color : Theme.primaryText
                }}
                    size={18}
                    strokeWidth={3}
                    className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2`}
                />
            </div>
        </div>
    )
}

export default DropDown
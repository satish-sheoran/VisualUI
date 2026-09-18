// This file write code for any color select code and the required informations should be provided to it during call

// This file writes code only for Setting's Color select Only

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSetting } from '../../store/features/systemSlice';

const Color = ({ ColorsInfo, parentSettingSection }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const ActiveColorVal = useSelector(store => store.systemSlice.Settings[parentSettingSection]
        ?.[ColorsInfo?.id])

    const performAction = (Section, option, val) => {
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
                    }}
                    className={`font-semibold`}
                >{ColorsInfo?.label}</p>
                <span
                    style={{
                        color: Theme.secText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                        fontFamily: Weights.SemiBold
                    }}
                    className={`font-semibold`}
                >{ColorsInfo?.description}</span>
            </div>

            <div style={{ borderColor: Theme.third, backgroundColor: Theme.header }} className={`p-2 relative border rounded-xl overflow-hidden grid gap-2 ${ColorsInfo?.options?.length > 5 ? 'grid-cols-5' : 'grid-cols-3'}`}>
                {
                    ColorsInfo?.options?.map(({ COLOR, CODE }) => {
                        return <button
                        onClick={()=>performAction(parentSettingSection, ColorsInfo?.id, COLOR)}
                            style={{
                                borderColor: ActiveColorVal === COLOR ? CODE : 'transparent',
                            }}
                            className={`border-2 w-10 h-10 rounded-full flex items-center justify-center p-0.5`}
                        >
                            <div
                                style={{
                                    backgroundColor: CODE,
                                }}
                                className={`w-full h-full rounded-full`}
                            >
                            </div>
                        </button>
                    })
                }
            </div>
        </div>
    )
}

export default Color
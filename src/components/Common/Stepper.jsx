// This file write code for stepper and the required informations should be provided to it during call

// This file writes code only for Setting's Stepper  Only

import { useDispatch, useSelector } from 'react-redux';
import { updateSetting } from '../../store/features/systemSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setFontFamily, setFontSize } from '../../store/features/DevicePreferences';

const Stepper = ({ Stepper, parentSettingSection }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const ActiveStepperVal = useSelector(store => Stepper?.id === 'font-size' ?
        store.Preferences?.FontSize?.SizeType
        :
        Stepper?.id === 'font-family' ?
            store.Preferences?.Font?.Name
            :
            store.systemSlice.Settings[parentSettingSection]
            ?.[Stepper?.id])


    const performAction = (Section, option, val) => {
        if (Stepper?.id === 'font-size') {
            dispatch(setFontSize({ Size: val }))
            return;
        }
        if (Stepper?.id === 'font-family') {
            dispatch(setFontFamily({ FontFamily: val }))

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
            className={`border px-3 py-2.5 w-full flex items-center justify-between gap-2 rounded-2xl`}
        >
            {/* label and description */}
            <div className={`max-w-1/2 flex flex-col gap-0.5`}>
                <p
                    style={{
                        color: Theme.primaryText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                        fontFamily: Weights.SemiBold
                    }} className={`font-semibold`}
                >{Stepper?.label}</p>
                <span
                    style={{
                        color: Theme.secText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                        fontFamily: Weights.SemiBold
                    }} className={`font-semibold`}
                >{Stepper?.description}</span>
            </div>

            <div
                style={{
                    borderColor: Theme.third,
                    backgroundColor: Theme.header,
                    color: Theme.primaryText
                }}
                className={`grow relative border rounded-2xl overflow-hidden flex gap-2 items-center justify-center py-1 px-2.5`}>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        let idx = Stepper?.options?.findIndex(({ value }) => value === ActiveStepperVal)
                        if (idx < 0) return;

                        if (idx - 1 < 0) {
                            performAction(parentSettingSection,
                                Stepper?.id,
                                Stepper?.options?.[Stepper?.options?.length - 1].value
                            )
                            return;
                        }
                        performAction(parentSettingSection,
                            Stepper?.id,
                            Stepper?.options?.[idx - 1].value
                        )
                    }}
                    className={`rounded-full flex items-center justify-center p-0.5 active:scale-95`}>
                    <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
                {
                    Stepper?.options?.map(({ label, value }) => {
                        return ActiveStepperVal === value &&
                            <span
                                style={{
                                    fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.75}rem`,
                                    fontFamily: Weights.Bold
                                }}
                                className={`font-bold grow text-center`}
                            >
                                {label}
                            </span>
                    })
                }
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        let idx = Stepper?.options?.findIndex(({ value }) => value === ActiveStepperVal)
                        if (idx < 0) return;

                        if (idx + 1 > Stepper?.options?.length - 1) {
                            performAction(parentSettingSection,
                                Stepper?.id,
                                Stepper?.options?.[0].value
                            )
                            return;
                        }
                        performAction(parentSettingSection,
                            Stepper?.id,
                            Stepper?.options?.[idx + 1].value
                        )
                    }}
                    className={`rounded-full flex items-center justify-center p-0.5 active:scale-95`}>
                    <ChevronRight size={22} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    )
}

export default Stepper
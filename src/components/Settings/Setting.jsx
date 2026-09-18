import { useSelector } from "react-redux";
import { SETTING_SECTIONS } from "../../constants/Settings"
import * as ICONS from 'lucide-react'
import { ACCENT_COLORS, COMMON_COLORS } from "../../constants/style";
import { useRef, useState } from "react";
import gsap from "gsap";
import DropDown from "../Common/DropDown";
import Toggle from "../Common/Toggle";
import MultiButton from "../Common/MultiButton";
import Color from "../Common/Color";
import Stepper from "../Common/Stepper";
import ActionButton from "../Common/ActionButton";
import About from "../Common/About";

const Setting = () => {

    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const Device = useSelector(store => store.Preferences.Device)

    // states
    const [openOptions, setOpenOptions] = useState(() => {
        return SETTING_SECTIONS.reduce((acc, sec) => {
            acc[sec.title] = acc[sec.title] || false;
            return acc;
        }, {})
    }); //used to show/hide reset details

    // refs
    const selectedSectionsDetailRef = useRef({})


    return (
        <div className={`grow w-full overflow-x-hidden overflow-y-auto p-[5%] flex flex-col gap-2`}>
            {/* search area */}
            {/*  */}


            {/* Section and their options */}
            {SETTING_SECTIONS.map(({ id, title, icon, description, options }) => {
                let Icon = ICONS[icon] ?? 'Home'
                return <div key={id}
                    style={{
                        borderColor: Theme.third,
                        backgroundColor: Theme.header
                    }}
                    className={`border flex flex-col ${openOptions[title] ? 'active:scale-97' : ''} shrink-0  rounded-2xl overflow-hidden`}>
                    <div
                        onClick={() => {
                            if (openOptions[title]) {
                                gsap.to(selectedSectionsDetailRef.current[title], {
                                    height: 'auto',
                                    paddingTop: Device !== 'Desktop' ? '0.75rem' : '0.625rem',
                                    paddingBottom: Device !== 'Desktop' ? '0.75rem' : '0.625rem',
                                    opacity: 1,
                                    duration: 0.3,
                                    ease: 'power2.out'
                                })
                                setOpenOptions((prevState) => ({ ...prevState, [title]: false }));
                            } else {
                                gsap.to(selectedSectionsDetailRef.current[title], {
                                    height: 0,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    opacity: 0,
                                    duration: 0.3,
                                    ease: 'power2.out'
                                })
                                setOpenOptions((prevState) => ({ ...prevState, [title]: true }));

                            }
                        }}
                        className={`flex items-center justify-between  overflow-hidden py-3 px-[5%]`}>
                        <div className={` flex items-center gap-2`}>
                            {Icon && <Icon style={{ color: Theme.primaryText }} strokeWidth={2.5} size={20} />}
                            <p className={`flex flex-col`}>
                                <span style={{
                                    color: Theme.primaryText,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1.25}rem`,
                                    fontFamily: Weights.Bold
                                }} className={`font-bold`}>{title}</span>
                                <span style={{
                                    color: Theme.primaryText,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`,
                                    fontFamily: Weights.SemiBold
                                }} className={`font-semibold`}>{description}</span>
                            </p>
                        </div>
                        {openOptions[title] ? <ICONS.ChevronDown style={{ color: Theme.primaryText }} strokeWidth={2.5} size={20} />
                            :
                            <ICONS.ChevronUp style={{ color: Theme.primaryText }} strokeWidth={2.5} size={20} />
                        }
                    </div>

                    {/* changes details */}
                    <div
                        ref={(el) => {
                            if (el) {
                                selectedSectionsDetailRef.current[title] = el
                            } else {
                                delete selectedSectionsDetailRef.current[title];
                            }
                        }}
                        style={{ backgroundColor: Theme.header, borderColor: Theme.third }}
                        className={`overflow-hidden border-t  flex flex-col gap-2 items-center px-[5%] ${Device !== 'Desktop' ? `py-3` : `py-2.5`}`}>
                        {
                            options.map((option) => {

                                if (option.type === 'select') return <DropDown
                                    key={option?.id}
                                    dropDown={option}
                                    parentSettingSection={id}
                                />

                                if (option.type === 'toggle') return <Toggle
                                    key={option?.id}
                                    toggle={option}
                                    parentSettingSection={id}
                                />

                                if (option.type === 'multi-button') return <MultiButton
                                    key={option?.id}
                                    MultiButton={option}
                                    parentSettingSection={id}
                                />

                                if (option.type === 'color') return <Color
                                    key={option?.id}
                                    ColorsInfo={option}
                                    parentSettingSection={id}
                                />
                                if (option.type === 'stepper') return <Stepper
                                    key={option?.id}
                                    Stepper={option}
                                    parentSettingSection={id}
                                />

                                if (option.type === 'action-button') return <ActionButton
                                    key={option?.id}
                                    ActionButtonIfo={option}
                                    parentSettingSection={id}
                                />
                                if (option.type === 'about') return <About />

                                return <div key={option?.id}
                                    className={`w-full flex flex-col`}
                                >
                                    {/* label and description */}
                                    <div className={`flex flex-col gap-0.5`}>
                                        <p
                                            style={{
                                                color: Theme.primaryText,
                                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                                                fontFamily: Weights.SemiBold
                                            }} className={`font-semibold`}
                                        >{option?.label}</p>
                                        <span
                                            style={{
                                                color: Theme.secText,
                                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                                                fontFamily: Weights.SemiBold
                                            }} className={`font-semibold`}
                                        >{option?.description}</span>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>

            })}
        </div>
    )
}

export default Setting
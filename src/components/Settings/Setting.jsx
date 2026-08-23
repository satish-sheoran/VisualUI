import { useSelector } from "react-redux";
import { SETTING_SECTIONS } from "../../constants/Settings"
import * as ICONS from 'lucide-react'
import { ACCENT_COLORS, COMMON_COLORS } from "../../constants/style";
import { useRef, useState } from "react";
import gsap from "gsap";

const Setting = () => {

    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const Device = useSelector(store => store.Preferences.Device)
    const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
    const ActivePage = useSelector(store => store.systemSlice.ActivePage)

    // states
    const [openOptions, setOpenOptions] = useState(() => {
        return SETTING_SECTIONS.reduce((acc, sec) => {
            acc[sec.Section] = acc[sec.Section] || false;
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
            {SETTING_SECTIONS.map(({ Section, icon, desc, options }) => {
                let Icon = ICONS[icon] ?? 'Home'
                return <div key={Section}
                    style={{
                        borderColor: Theme.third,
                        backgroundColor: Theme.header
                    }}
                    className={`border flex flex-col active:scale-97 shrink-0  px-[5%] rounded-2xl`}>
                    <div
                        onClick={() => {
                            if (openOptions[Section]) {
                                gsap.to(selectedSectionsDetailRef.current[Section], {
                                    height: 'auto',
                                    paddingTop: Device !== 'Desktop' ? '0.75rem' : '0.625rem',
                                    paddingBottom: Device !== 'Desktop' ? '0.75rem' : '0.625rem',
                                    opacity: 1,
                                    duration: 0.3,
                                    ease: 'power2.out'
                                })
                                setOpenOptions((prevState) => ({ ...prevState, [Section]: false }));
                            } else {
                                gsap.to(selectedSectionsDetailRef.current[Section], {
                                    height: 0,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    opacity: 0,
                                    duration: 0.3,
                                    ease: 'power2.out'
                                })
                                setOpenOptions((prevState) => ({ ...prevState, [Section]: true }));

                            }
                        }}
                        className={`flex items-center justify-between  overflow-hidden py-3`}>
                        <div className={` flex items-center gap-2`}>
                            {Icon && <Icon style={{ color: Theme.primaryText }} strokeWidth={2.5} size={20} />}
                            <p className={`flex flex-col`}>
                                <span style={{
                                    color: Theme.primaryText,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`,
                                    fontFamily: Weights.Bold
                                }}>{Section}</span>
                                <span style={{
                                    color: Theme.primaryText,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`,
                                    fontFamily: Weights.SemiBold
                                }}>{desc}</span>
                            </p>
                        </div>
                        { openOptions[Section] ?<ICONS.ChevronDown style={{ color: Theme.primaryText }} strokeWidth={2.5} size={20} />
                        :
                        <ICONS.ChevronUp style={{ color: Theme.primaryText }} strokeWidth={2.5} size={20} />
                        }
                    </div>

                    {/* changes details */}
                    <div

                        ref={(el) => {
                            if (el) {
                                selectedSectionsDetailRef.current[Section] = el
                            } else {
                                delete selectedSectionsDetailRef.current[Section];
                            }
                        }} style={{ backgroundColor: Theme.header, borderColor: Theme.third }}
                        className={`overflow-hidden border-t  flex gap-2 justify-between items-center ${Device !== 'Desktop' ? `p-3` : `p-2.5`}`}>
                        <div style={{
                            fontSize: `${(Sizes.ExtraSmall.slice(0, -3)) * 1.2}rem`,
                            fontFamily: Weights.Regular,
                            color: Theme.thirdText,
                        }} className={`max-w-[65%] flex flex-col gap-1`}>
                            <span style={{
                                fontSize: Sizes.Small,
                                fontFamily: Weights.SemiBold,
                                color: Theme.primaryText,
                            }}>Will reset the following :</span>

                            <div className={`flex flex-col gap-0`}>
                                {options.map((detail, index) => {
                                    return <p key={index} className={`flex gap-0 items-center`}>
                                        <ICONS.Dot style={{ color: ACCENT_COLORS.find(({ COLOR }) => COLOR == 'Blue').CODE }} strokeWidth={2} />
                                        <span>{detail}</span>
                                    </p>
                                })}
                            </div>

                        </div>
                        <div onClick={(e) => e.stopPropagation()}
                            style={{
                                borderColor: Theme.third,
                                backgroundColor: Theme.bg,
                                '--hover': Theme.third,
                                '--active': Theme !== 'dark' ?
                                    Device !== 'Desktop' ? Theme.third : COMMON_COLORS.White
                                    :
                                    COMMON_COLORS.Gray,
                            }}
                            className={`HOVER_CLASS active:scale-95 flex items-center gap-2 border rounded-xl px-2 py-1`}>
                            <ICONS.Database
                                style={{
                                    color: ACCENT_COLORS.find(({ COLOR }) => COLOR == 'Blue').CODE,
                                }}
                                size={20}
                                strokeWidth={2} />
                            <p className={`flex flex-col gap-0.5`}>
                                <span
                                    style={{
                                        fontSize: `${(Sizes.ExtraSmall.slice(0, -3)) * 1.1}rem`,
                                        fontFamily: Weights.SemiBold,
                                        color: Theme.thirdText,
                                    }}
                                >
                                    Data size</span>
                                <span
                                    style={{
                                        fontSize: `${(Sizes.ExtraSmall.slice(0, -3)) * 1.2}rem`,
                                        fontFamily: Weights.Bold,
                                        color: Theme.primaryText,
                                    }}>
                                    ~ 50Kb</span>
                            </p>

                        </div>
                    </div>
                </div>

            })}
            <div></div>
        </div>
    )
}

export default Setting
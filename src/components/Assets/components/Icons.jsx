import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ACCENT_COLORS, COMMON_COLORS } from '../../../constants/style'
import { Fish, icons as ICONS, Search, SearchAlert, X } from 'lucide-react'
import IconInfo from './Icons/IconInfo'
import gsap from 'gsap'
import { toast } from 'react-toastify'
import { useGSAP } from '@gsap/react'

const Icons = ({ activeAsset, ShowIntertion }) => {

    const Device = useSelector(store => store.Preferences.Device)
    const Theme = useSelector((store) => store.Preferences.Theme)
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);

    const LUCID_ICONS = useMemo(() => {
        return Object.entries(ICONS).map(([name, Icon]) => ({
            name,
            displayName: name,
            searchName: name.toLowerCase(),
            component: Icon,
        }));
    }, []);

    // states
    const [isFocused, setisFocused] = useState(false)
    const [inputVal, setInputVal] = useState('')
    const [showIconInfo, setShowIconInfo] = useState({ show: false, icon: {} })

    // Derive a boolean so the effect only triggers when the state actually crosses the boundary
    const hasText = inputVal.trim().length > 0;

    const filteredIcons = useMemo(() => {
        if (!inputVal.trim()) {
            return LUCID_ICONS;
        }
        const search = inputVal.toLowerCase().trim();

        return LUCID_ICONS.filter((icon) =>
            icon.searchName.toLowerCase().includes(search))
    }, [LUCID_ICONS, inputVal])


    // refs
    const IconInfoRef = useRef(null)
    const InputRef = useRef(null)

    useEffect(() => {
        if (activeAsset === 'Icons') return;
        setShowIconInfo({ show: false, icon: {} })

    }, [activeAsset])

    useGSAP(() => {
        if (!InputRef.current) return;

        gsap.to(InputRef.current, {
            width: inputVal.trim() ? '85%' : '100%',
            duration: 0.5,
            ease: 'expo.inOut'
        })

    }, [hasText])

    return (
        <>
            {/* search section */}
            <div className={`relative mb-2 flex items-start gap-2`}>
                <div
                    ref={InputRef}
                    style={{
                        backgroundColor: Theme.header, color: Theme.primaryText,
                        borderColor: isFocused ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE : Theme.third
                    }}
                    className={`z-1 w-full border flex gap-2 py-2 rounded-2xl ${Device !== 'Desktop' ? 'px-3' : 'px-2.5'}`}>

                    <Search strokeWidth={2.5} size={25} />
                    <input
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        type="text"
                        spellCheck={false}
                        placeholder="Search icons ..."
                        onFocus={() => setisFocused(true)}
                        onBlur={() => setisFocused(false)}
                        maxLength={50}
                        style={{
                            fontSize: Device !== 'Desktop' ? `${(Sizes.Small.slice(0, -3)) * 1.2}rem` : `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
                            , color: Theme.primaryText, fontFamily: Weights.SemiBold,
                        }}
                        className={`w-full  font-semibold outline-none focus:ring-0 focus:border-0 focus:outline-none`}
                    />
                </div>
                <button
                    onClick={() => setInputVal('')}
                    style={{
                        color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').CODE,
                        borderColor: Theme.third,
                        backgroundColor: Theme.header
                    }}
                    className={`absolute right-0 top-0 shrink-0 border h-full p-0.5 aspect-square 
                rounded-full flex items-center justify-center active:scale-95`}>
                    <X strokeWidth={2} size={28} />
                </button>
            </div>

            <div
                style={{
                    color: Theme.secText,
                    fontFamily: Weights.SemiBold,
                    fontSize: Sizes.Small
                }}
                className={`pt-[2.5%] w-full grow font-semibold
                     ${filteredIcons.length > 0 ? 'grid grid-cols-6 gap-2 content-start'
                        : 'flex flex-col items-center justify-center gap-3'}
                        `}>
                {filteredIcons.length > 0 ? filteredIcons.map(({ name, component: Component }) => (
                    <button
                        key={name}
                        onClick={() => {
                            if (!showIconInfo.show) {

                                gsap.fromTo(IconInfoRef.current, {
                                    y: 50,
                                }, {
                                    y: 0,
                                    duration: 1,
                                    ease: 'back.out'
                                })
                            }
                            setShowIconInfo({ show: true, icon: { name, Component } })
                        }
                        }
                        style={{
                            color: Theme.primaryText,
                            backgroundColor: Theme.header,
                            fontFamily: Weights.SemiBold,
                            fontSize: Sizes.Small,
                            borderColor: Theme.third,
                        }}
                        className={`active:scale-95 font-semibold border flex items-center justify-center rounded-full aspect-square`}
                    >
                        <Component size={20} strokeWidth={2} />
                    </button>

                ))
                    :
                    <>
                        <Fish style={{ color: Theme.primaryText }} strokeWidth={1.5} size={40} />
                        <span
                            style={{
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.3}rem`,
                                fontFamily: Weights.Bold
                            }} className={`font-bold text-center`}
                        >{`No results for "${inputVal}"`}</span>

                        <div
                            style={{
                                color: Theme.secText,
                                fontSize: `${(Sizes.ExtraSmall.slice(0, -3)) * 1.2}rem`,
                                fontFamily: Weights.Regular
                            }}
                            className='text-center'
                        >This icon doesn't seem to exist... yet. Try searching similar terms, browsing existing requests, or opening a new one.</div>

                        <button
                            onClick={() => setInputVal('')}
                            style={{
                                backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').Hover_Clr,
                                borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').CODE,
                                color: COMMON_COLORS.White,
                                fontSize: Sizes.Small,
                                fontFamily: Weights.Bold
                            }}
                            className={`font-bold mt-1 border w-fit rounded-2xl py-1.5 px-2 active:scale-95`}>Clear search & try again</button>
                    </>
                }
            </div>

            {showIconInfo.show &&
                <IconInfo
                    ShowIntertion={ShowIntertion} // used to show insert button
                    showIconInfo={showIconInfo}
                    setShowIconInfo={setShowIconInfo}
                    IconInfoRef={IconInfoRef} />
            }

        </>
    )
}

export default Icons
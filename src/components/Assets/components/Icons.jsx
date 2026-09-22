import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ACCENT_COLORS } from '../../../constants/style'
import { icons as ICONS, Search } from 'lucide-react'
import IconInfo from './Icons/IconInfo'
import gsap from 'gsap'

const Icons = ({ activeAsset }) => {

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

    // refs
    const IconInfoRef = useRef(null)

    useEffect(() => {
        if (activeAsset === 'Icons') return;
        setShowIconInfo({ show: false, icon: {} })

    }, [activeAsset])

    return (
        <>
            {/* search section */}
            <div
                style={{
                    backgroundColor: Theme.header, color: Theme.primaryText,
                    borderColor: isFocused ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE : Theme.third
                }}
                className={`shrink-0 mb-2 border flex gap-2 py-2 rounded-2xl ${Device !== 'Desktop' ? 'px-3' : 'px-2.5'}`}>

                <Search strokeWidth={2.5} size={25} />
                <input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    type="text"
                    spellCheck={false}
                    placeholder="Search icons ..."
                    onFocus={() => setisFocused(true)}
                    onBlur={() => setisFocused(false)}
                    style={{
                        fontSize: Device !== 'Desktop' ? `${(Sizes.Small.slice(0, -3)) * 1.2}rem` : `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
                        , color: Theme.primaryText, fontFamily: Weights.SemiBold,
                    }}
                    className={`w-full  font-semibold outline-none focus:ring-0 focus:border-0 focus:outline-none`}
                />
            </div>

            <div
                style={{
                    color: Theme.secText,
                    fontFamily: Weights.SemiBold,
                    fontSize: Sizes.Small
                }}
                className={`pt-[2.5%] w-full grow grid grid-cols-6 gap-2 font-semibold`}>
                {LUCID_ICONS.map(({ name, component: Component }) => (
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
                ))}
            </div>

            {showIconInfo.show && 
            <IconInfo showIconInfo={showIconInfo} setShowIconInfo={setShowIconInfo} IconInfoRef={IconInfoRef} />
            }

        </>
    )
}

export default Icons
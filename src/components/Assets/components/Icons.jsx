import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { ACCENT_COLORS } from '../../../constants/style'
import * as ICONS from 'lucide-react'

const Icons = () => {

    const Device = useSelector(store => store.Preferences.Device)
    const Theme = useSelector((store) => store.Preferences.Theme)
    const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
    const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);

    const LUCID_ICONS = useMemo(() => {
        return Object.entries(ICONS)
            .filter(([name, Icon]) => {
                return (
                    typeof Icon === "object" &&
                    Icon !== null &&
                    Icon.$$typeof?.toString() === "Symbol(react.forward_ref)"
                );
            })
            .map(([name, Icon]) => ({
                name,
                displayName: Icon.displayName || name,
                searchName: name.toLowerCase(),
                component: Icon
            }));
    }, []);

    // states
    const [isFocused, setisFocused] = useState(false)
    const [inputVal, setInputVal] = useState('')

    // useEffect(() => {
    //     console.log(LUCID_ICONS)
    // }, [])

    return (
        <>
            {/* search section */}
            <div
                style={{
                    backgroundColor: Theme.header, color: Theme.primaryText,
                    borderColor: isFocused ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE : Theme.third
                }}
                className={`shrink-0 mb-2 border flex gap-2 py-2 rounded-2xl ${Device !== 'Desktop' ? 'px-3' : 'px-2.5'}`}>

                <ICONS.Search strokeWidth={2.5} size={25} />
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
                className={`pt-[2.5%] w-full grow grid grid-cols-6 gap-2 `}>
                {
                    LUCID_ICONS.map(({ name, displayName, searchName, component: Component }) => {
                        return <button
                            style={{
                                color: Theme.primaryText,
                                backgroundColor: Theme.header,
                                fontFamily: Weights.SemiBold,
                                fontSize: Sizes.Small,
                                borderColor: Theme.third,
                            }}
                            className={`border flex items-center justify-center rounded-full aspect-square`}
                        >
                            <ICONS.Search />
                        </button>
                    })
                }
            </div>
        </>
    )
}

export default Icons
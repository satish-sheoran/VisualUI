import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { ACCENT_COLORS } from '../../../constants/style'
import { useSelector } from 'react-redux'

const Images = () => {

  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
  const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);

  // states
  const [isFocused, setisFocused] = useState(false)
  const [inputVal, setInputVal] = useState('')

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
          placeholder="Search Images ..."
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
        className={`w-full grow flex items-center justify-center`}>
        Adding Soon...
      </div>

    </>
  )
}

export default Images
import { useState } from 'react'
import Icons from './Icons'
import Images from './Images'
import Illustrations from './Illustrations'
import { useSelector } from 'react-redux'
import { ACCENT_COLORS, COMMON_COLORS } from '../../../constants/style'

const AssetsSec = () => {

  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
  const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);

  // states
  const [activeAsset, setActiveAsset] = useState('Icons')

  return (
    <div
      style={{
        borderColor: Theme.third
      }}
      className={`border-t w-full grow overflow-x-hidden overflow-y-auto flex flex-col pt-[5%]`}>

      <div className={`grid grid-cols-3 gap-3 shrink-0 overflow-hidden mb-4`}>
        <button
          onClick={() => setActiveAsset('Icons')}
          style={{
            color: activeAsset === 'Icons' ? COMMON_COLORS.White : Theme.primaryText,
            borderColor: Theme.third,
            backgroundColor: activeAsset === 'Icons' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.header,
            fontFamily: Weights.SemiBold,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
          }}
          className={`border rounded-2xl py-2`}
        >Icons</button>
        <button
          onClick={() => setActiveAsset('Images')}
          style={{
            color: activeAsset === 'Images' ? COMMON_COLORS.White : Theme.primaryText,
            borderColor: Theme.third,
            backgroundColor: activeAsset === 'Images' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.header,
            fontFamily: Weights.SemiBold,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
          }}
          className={`border rounded-2xl py-2`}
        >Images</button>
        <button
          onClick={() => setActiveAsset('Illustrations')}
          style={{
            color: activeAsset === 'Illustrations' ? COMMON_COLORS.White : Theme.primaryText,
            borderColor: Theme.third,
            backgroundColor: activeAsset === 'Illustrations' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.header,
            fontFamily: Weights.SemiBold,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
          }}
          className={`border rounded-2xl py-2`}
        >Illustrations</button>
      </div>

      {activeAsset === 'Icons' && <Icons />}
      {activeAsset === 'Images' && <Images />}
      {activeAsset === 'Illustrations' && <Illustrations />}
    </div>
  )
}

export default AssetsSec
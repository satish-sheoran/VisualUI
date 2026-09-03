import { Files, LayoutTemplate, Search } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { ACCENT_COLORS, COMMON_COLORS } from "../../constants/style"
import Templates from "./components/Templates"
import AssetsSec from "./components/AssetsSec"

const Assets = () => {

  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
  const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);

  // states
  const [activeSection, setActiveSection] = useState('Templates')

  return (
    <div className={`w-full h-full overflow-hidden pt-[2.5%] flex flex-col p-[5%] pb-[0%] gap-4`}>

      <div className={`flex flex-col gap-0`}>
        <span
        style={{
          color : Theme.primaryText,
          fontSize : `${(Sizes.Regular.slice(0, -3)) * 0.9}rem`,
          fontFamily : Weights.ExtraBold
        }}
        >Assets</span>
        <span
        style={{
          color : Theme.secText,
          fontSize : `${(Sizes.Small.slice(0, -3)) * 0.9}rem`,
          fontFamily : Weights.SemiBold
        }}
        >Templates & Icon Library</span>
      </div>

      {/*  templte and assets change buttons */}
      <div className={`shrink-0 w-full flex items-center gap-3 justify-center`}>

        <div
          onClick={() => setActiveSection('Templates')}
          style={{
            color: activeSection === 'Templates' ? COMMON_COLORS.White : Theme.primaryText,
            backgroundColor: activeSection === 'Templates' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.header,
            borderColor: Theme.third,
            fontFamily: Weights.Bold,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
          }}
          className={`border w-1/2 grow flex items-center justify-center gap-2 py-2 rounded-2xl`}
        >
          <LayoutTemplate strokeWidth={2.5} size={20} />
          <span>Templates</span>
        </div>

        <div
          onClick={() => setActiveSection('Assets')}
          style={{
            color: activeSection === 'Assets' ? COMMON_COLORS.White : Theme.primaryText,
            backgroundColor: activeSection === 'Assets' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.header,
            borderColor: Theme.third,
            fontFamily: Weights.Bold,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
          }}
          className={`border w-1/2 grow flex items-center justify-center gap-2 py-2 rounded-2xl`}
        >
          <Files strokeWidth={2.5} size={20} />
          <span>Assets</span>
        </div>

      </div>


      {/* resultant body as per active section (templates or assets) */}
      {activeSection === 'Templates' && <Templates />}
      {activeSection === 'Assets' && <AssetsSec />}

    </div>
  )
}

export default Assets
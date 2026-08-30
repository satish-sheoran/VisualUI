import { useState } from "react"
import { useSelector } from "react-redux"
import { ACCENT_COLORS } from '../../constants/style'
import { ChevronsUpDown, Search } from "lucide-react"
import { toast } from "react-toastify"
const Projects = () => {

  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
  const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);

  const [isFocused, setisFocused] = useState(false)
  const [inputVal, setInputVal] = useState('')

  return (
    <div className={` w-full h-full flex flex-col px-[5%] pt-[5%] gap-4 overflow-hidden`}>

      {/* searchArea */}
      <div
        style={{
          backgroundColor: Theme.header, color: Theme.primaryText,
          borderColor: isFocused ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE : Theme.third
        }}
        className={`mb-2 border flex gap-2 py-2 rounded-2xl ${Device !== 'Desktop' ? 'px-3' : 'px-2.5'}`}>

        <Search strokeWidth={2.5} size={25} />
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          type="text"
          spellCheck={false}
          placeholder="Search projects..."
          onFocus={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
          style={{
            fontSize: Device !== 'Desktop' ? `${(Sizes.Small.slice(0, -3)) * 1.2}rem` : `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
            , color: Theme.primaryText, fontFamily: Weights.SemiBold,
          }}
          className={`w-full  font-semibold outline-none focus:ring-0 focus:border-0 focus:outline-none`}
        />
      </div>

      {/* sections - All/Drafts/Shared */}
      <div className={`flex items-center gap-4`}>
        {
          [
            { ProjectPage: 'All' },
            { ProjectPage: 'Drafts' },
            { ProjectPage: 'Shared' },

          ].map(({ ProjectPage }, idx) => {
            return <button
              key={ProjectPage}
              onClick={() => toast.info('Adding Soon...')}
              style={{
                borderColor: Theme.third,
                color: Theme.primaryText,
                backgroundColor: Theme.header,
                fontFamily: Weights.Bold,
                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
              }}
              className={`active:scale-97 overflow-hidden relative flex items-center justify-center py-2 border w-1/3 rounded-xl`}
            >
              {ProjectPage}

              <div style={{ borderColor: idx === 0 ? 'red' : 'transparent' }} className={`border absolute bottom-0 left-0 w-full`}></div>
            </button>
          })
        }

      </div>

      {/* projects */}
      <div className={`grow rounded-2xl w-full flex flex-col gap-4 overflow-y-auto`}>
        {
          [
            {
              src: '/assets/GetStart1.webp',
              ProjectName: 'Saas Dashboard',
              TotalScreens: '12 screens',
              LastEdit: 'Edited Now'
            },
            {
              src: '/assets/GetStart2.webp',
              ProjectName: 'Finance App',
              TotalScreens: '8 screens',
              LastEdit: '2h ago'
            },
            {
              src: '/assets/GetStart3.webp',
              ProjectName: 'Portfolio Website',
              TotalScreens: '6 screens',
              LastEdit: '1d ago'
            },
            {
              src: '/assets/GetStart4.webp',
              ProjectName: 'Mobile Banking',
              TotalScreens: '16 screens',
              LastEdit: '3d ago'
            },
            {
              src: '/assets/GetStart4.webp',
              ProjectName: 'Mobile Banking',
              TotalScreens: '16 screens',
              LastEdit: '3d ago'
            },
            {
              src: '/assets/GetStart4.webp',
              ProjectName: 'Mobile Banking',
              TotalScreens: '16 screens',
              LastEdit: '3d ago'
            },
            {
              src: '/assets/GetStart4.webp',
              ProjectName: 'Mobile Banking',
              TotalScreens: '16 screens',
              LastEdit: '3d ago'
            },
          ].map(({ src, ProjectName, TotalScreens, LastEdit }) => {
            return <div
              key={ProjectName}
              onClick={()=>toast.info('Adding Soon...')}
              style={{
                borderColor: Theme.third,
                backgroundColor: Theme.header
              }}
              className={`shrink-0 active:scale-97 px-[5%] py-2 rounded-2xl border w-full flex items-center justify-between gap-4 overflow-hidden`}
            >
              <div className={`aspect-square  w-1/5 `}>
                <img className={`w-full h-full  object-cover object-center`} src={src} alt='img' />
              </div>

              <div className={`grow flex flex-col`}>
                <p style={{
                  color: Theme.primaryText,
                  fontFamily: Weights.ExtraBold,
                  fontSize: `${(Sizes.Small.slice(0, -3)) * 1.25}rem`
                }}>{ProjectName}</p>
                <p className={`flex gap-2.5 items-center`}>
                  <span style={{
                    color: Theme.secText,
                    fontFamily: Weights.SemiBold,
                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`
                  }}>{TotalScreens}</span>
                  <span style={{
                    color: Theme.secText,
                    fontFamily: Weights.SemiBold,
                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`
                  }}>{`•  ${LastEdit}`}</span>
                </p>
              </div>

              <div className={`flex items-center justify-center`}>
                <ChevronsUpDown strokeWidth={2.5} size={25} />
              </div>
            </div>
          })
        }
      </div>

    </div>
  )
}

export default Projects
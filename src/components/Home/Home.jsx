import { useSelector } from "react-redux"
import { USER_NAME } from '../../constants/index'
import { useState } from "react"
import * as Icons from 'lucide-react'
import { ACCENT_COLORS } from '../../constants/style'
import { toast } from "react-toastify"

const Tools = [
  {
    icon: 'Swords',
    Name: 'UI Kits'
  },
  {
    icon: 'Pipette',
    Name: 'Colors'
  },
  {
    icon: 'Heart',
    Name: 'Icons'
  },

]

const Home = () => {

  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
  const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);
  const userDetails = useSelector(store => store.systemSlice.userDetails);

  // states
  // temporary state for now
  const [RecentProjects, setRecentProjects] = useState([])


  return (
    <div className={`w-full h-full overflow-y-auto overflow-x-hidden pt-[2.5%]`}>
      <div className={`shrink-0 w-full min-h-full flex flex-col p-[5%] pb-[8%] gap-7 `}>

        {/* Morning msg */}
        <div className={`shrink-0 flex flex-col justify-start text-left`}>
          <h2 style={{
            color: Theme.primaryText,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.35}rem`,
            fontFamily: Weights.Bold
          }}>Good Morning, {userDetails.userName} 👋</h2>
          <span style={{
            color: Theme.secText,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
            fontFamily: Weights.Regular
          }}>Let's  build something amazing</span>
        </div>

        {/* new project +  Templates */}
        <div className={`shrink-0 flex items-center gap-3`}>
          <div onClick={() => toast.info('Adding Soon...')}
            style={{
              backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr,
              borderColor: Theme.third,
            }}
            className={`active:scale-97 border grow w-1/2 aspect-square rounded-2xl flex flex-col items-center justify-center`}>
            <div style={{ backgroundColor: Theme.header, borderColor: Theme.third }} className={`border p-1.5 rounded-full flex items-center justify-center`}>
              <Icons.FilePlus2 style={{ color: Theme.primaryText }} strokeWidth={2.5} size={22} />
            </div>
            <p style={{
              color: Theme.primaryText,
              fontFamily: Weights.Bold,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
            }} className={`mt-1`}>New Project</p>
            <span style={{
              color: Theme.secText,
              fontFamily: Weights.SemiBold,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 0.8}rem`
            }}>Start from scratch</span>
          </div>

          <div onClick={() => toast.info('Adding Soon...')} style={{
            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr,
            borderColor: Theme.third,
          }}
            className={`active:scale-97 border grow w-1/2 aspect-square rounded-2xl flex flex-col items-center justify-center`}>
            <div style={{ backgroundColor: Theme.header, borderColor: Theme.third }} className={`border p-1.5 rounded-full flex items-center justify-center`}>
              <Icons.LayoutTemplate style={{ color: Theme.primaryText }} strokeWidth={2.5} size={22} />
            </div>
            <p style={{
              color: Theme.primaryText,
              fontFamily: Weights.Bold,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
            }} className={`mt-1`}> Templates</p>
            <span style={{
              color: Theme.secText,
              fontFamily: Weights.SemiBold,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 0.8}rem`
            }}>50+ ready designs</span>
          </div>
        </div>

        {/* recent projects */}
        <div className={`shrink-0 flex flex-col gap-3`}>
          {/* title and see all button */}
          <div className={`flex items-center justify-between`}>
            <p style={{
              color: Theme.primaryText,
              fontFamily: Weights.ExtraBold,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
            }}>Recent Projects</p>
            {RecentProjects.length > 0 && <p
              onClick={() => toast.info('Adding Soon...')}
              style={{
                color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE,
                fontFamily: Weights.Bold,
                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
              }}>See All</p>}
          </div>

          {/* projects old */}
          <div className={`flex overflow-x-auto items-center gap-3`}>
            {RecentProjects.length > 0 ? RecentProjects.map(({ ProjectName, LastEdited }) => {
              return <div key={ProjectName}
                style={{
                  borderColor: Theme.third,
                  backgroundColor: Theme.header
                }}
                className={`p-[3%] shrink-0 border w-1/2 flex flex-col gap-1 items-center justify-center aspect-square rounded-2xl overflow-hidden`}
              >
                <div className={`w-8/10 h-fit overflow-hidden`}>
                  <img className={`w-full object-cover object-center`} src="/assets/GetStart2.webp" alt="Img" />
                </div>
                <div className={`w-full flex flex-col`}>
                  <p style={{
                    color: Theme.primaryText,
                    fontFamily: Weights.Bold,
                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
                  }}>{ProjectName}</p>
                  <span style={{
                    color: Theme.secText,
                    fontFamily: Weights.SemiBold,
                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`
                  }}>{LastEdited}</span>
                </div>
              </div>
            }) :
              <div style={{
                color: Theme.primaryText,
                fontFamily: Weights.ExtraBold,
                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
              }} className={`w-full h-15  flex items-center justify-center`}>No Recent Projects...</div>
            }
          </div>
        </div>

        {/* quick tools */}
        <div className={`shrink-0 flex flex-col gap-3`}>
          <p style={{
            color: Theme.primaryText,
            fontFamily: Weights.ExtraBold,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
          }}>Quick Tools</p>
          <div className={`grid grid-cols-3 gap-3`}>
            {Tools.map(({ icon, Name }) => {
              const Icon = Icons[icon]
              return <div key={Name}
                onClick={() => toast.info('Adding Soon...')}
                style={{
                  backgroundColor: Theme.sec,
                  borderColor: Theme.third
                }}
                className={`border active:scale-97 aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center`}
              >
                {Icon && <Icon style={{
                  color: Theme.primaryText
                }} strokeWidth={2.5} size={22} />}
                <span style={{
                  color: Theme.primaryText,
                  fontFamily: Weights.Bold,
                  fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`
                }}>{Name}</span>
              </div>
            })}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
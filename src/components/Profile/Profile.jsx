import * as Icons from 'lucide-react'
import { useSelector } from "react-redux"
import { toast } from 'react-toastify'

const Profile = () => {

  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
  const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);
  const userDetails = useSelector(store => store.systemSlice.userDetails);


  return (
    <div className={`w-full h-full overflow-y-auto overflow-x-hidden pt-[2.5%]`}>
      <div className={`shrink-0 w-full min-h-full flex flex-col p-[5%] pb-[8%] gap-3 `}>

        {/* user name,email and img */}
        <div className={`flex flex-col items-center justify-center`}>
          <div className={`border rounded-full overflow-hidden aspect-square w-[27%]`}
            style={{
              backgroundColor: Theme.sec,
              borderColor: Theme.third,
              color: Theme.primaryText
            }}
          >
            <img className={`w-full h-full object-cover object-center`} src="/visualUI.webp" alt="user" />
          </div>
          <p
            style={{
              color: Theme.primaryText,
              fontFamily: Weights.ExtraBold,
              fontSize: `${(Sizes.Regular.slice(0, -3)) * 1.25}rem`
            }}>
            {userDetails.userName}
          </p>

          <p
            style={{
              color: Theme.secText,
              fontFamily: Weights.Bold,
              fontSize: `${(Sizes.Small.slice(0, 3)) * 0.9}rem`
            }}
          >
            {userDetails.email}
          </p>
        </div>

        {/* projects,likes,teams sections */}
        <div
          style={{
            borderColor: Theme.third,
            backgroundColor: Theme.header
          }}
          className={`border rounded-2xl flex items-center justify-between px-4 py-2`}
        >
          <p className={`flex flex-col items-center`}>
            <span
              style={{
                color: Theme.primaryText,
                fontFamily: Weights.ExtraBold,
                fontSize: `${(Sizes.Small.slice(0, 3)) * 1.2}rem`
              }}
            >12</span>
            <span
              style={{
                color: Theme.secText,
                fontFamily: Weights.Bold,
                fontSize: `${(Sizes.Small.slice(0, 3)) * 0.9}rem`
              }}
            >Projects</span>
          </p>
          <p className={`flex flex-col items-center gap-0.5`}>
            <span
              style={{
                color: Theme.primaryText,
                fontFamily: Weights.ExtraBold,
                fontSize: `${(Sizes.Small.slice(0, 3)) * 1.2}rem`
              }}
            >5</span>
            <span
              style={{
                color: Theme.secText,
                fontFamily: Weights.Bold,
                fontSize: `${(Sizes.Small.slice(0, 3)) * 0.9}rem`
              }}
            >Teams</span>
          </p>
          <p className={`flex flex-col items-center gap-0.5`}>
            <span
              style={{
                color: Theme.primaryText,
                fontFamily: Weights.ExtraBold,
                fontSize: `${(Sizes.Small.slice(0, 3)) * 1.2}rem`
              }}
            >12k +</span>
            <span
              style={{
                color: Theme.secText,
                fontFamily: Weights.Bold,
                fontSize: `${(Sizes.Small.slice(0, 3)) * 0.9}rem`
              }}
            >Likes</span>
          </p>
        </div>

        {/* options */}
        <div style={{
          borderColor : Theme.third,
          backgroundColor : Theme.header
        }} className={`border rounded-2xl px-2.5 py-3 flex flex-col items-center gap-2`}>
          {
            [
              {
                icon: 'FolderKanban',
                option: 'My Projects',
                openAble: true
              },
              {
                icon: 'Heart',
                option: 'Favourites',
                openAble: true
              },
              {
                icon: 'BadgeQuestionMark',
                option: 'Help & Support',
                openAble: true
              },
              {
                icon: 'LogOut',
                option: 'Log out',
                openAble: false
              },
            ].map(({ icon, option, openAble }) => {
              const Icon = Icons[icon]
              return <div key={option}
              onClick={()=>toast.error('Adding Soon...')}
                style={{
                  borderColor : Theme.third,
                  '--hover': Theme.third
                }}
                className={`HOVER_CLASS active:scale-97  w-full rounded-2xl flex items-center justify-between`}>
                <div className={`flex items-center gap-2 px-2.5 py-3`}>
                  {Icon && <Icon strokeWidth={2.5} />}
                  <span>{option}</span>
                </div>
                {openAble && <p><Icons.ChevronRight strokeWidth={2.5} /></p>}
              </div>
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Profile
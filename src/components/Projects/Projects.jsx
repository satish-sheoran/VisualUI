import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ACCENT_COLORS } from '../../constants/style'
import { ChevronsUpDown, Search } from "lucide-react"
import { setShowCanvas, setWorkingProject } from "../../store/features/Canvas"
import { toast } from "react-toastify"

const Projects = () => {

  const dispatch = useDispatch();
  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
  const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);
  const AllProjects = useSelector(store => store.Canvas.Projects)

  const sharedProjects = AllProjects.filter(({ hasShared }) => hasShared)

  const [isFocused, setisFocused] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [projectFilter, setProjectFilter] = useState('All')

  // fns
  function getTimeAgo(timeStamp) {

    const stampGap = Date.now() - timeStamp;
    const sec = Math.floor(stampGap / 1000)
    const min = Math.floor(sec / 60)
    const hr = Math.floor(min / 60)
    const day = Math.floor(hr / 24)

    if (sec < 60) return 'Few seconds ago'
    if (min < 60) return `${min} ${min === 1 ? 'min' : 'mins'} ago`
    if (hr < 24) return `${hr} ${hr === 1 ? 'hr' : 'hrs'} ago`
    return `${day} ${day === 1 ? 'day' : 'days'} ago`

  } //fn returns how much time before thing is updated (1 min ago) as per providen timeStamp

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
              onClick={() => setProjectFilter(ProjectPage)}
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

              <div style={{ borderColor: projectFilter === ProjectPage ? 'red' : 'transparent' }} className={`border absolute bottom-0 left-0 w-full`}></div>
            </button>
          })
        }

      </div>

      {/* projects */}
      <div className={`grow rounded-2xl w-full flex flex-col gap-4 overflow-y-auto`}>


        {(projectFilter === 'Shared' && sharedProjects.length <= 0) ?
          <div
            style={{
              fontFamily: Weights.SemiBold,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
              color: Theme.secText
            }}
            className={`w-full h-full rounded-2xl flex items-center justify-center`}
          >No Project has been shared!</div>
          :
          <>
            {
              AllProjects.length > 0 ?
                AllProjects.map((Project) => {

                  const timeAgo = getTimeAgo(Project?.updatedAt) // getting times ago it was updated

                  return <div
                    key={Project?.id}
                    onClick={() => {
                      dispatch(setWorkingProject({ project: Project }))
                      dispatch(setShowCanvas({ showCanvas: true }))
                    }}
                    style={{
                      borderColor: Theme.third,
                      backgroundColor: Theme.header
                    }}
                    className={`shrink-0 active:scale-97 px-[5%] py-2 rounded-2xl border w-full flex items-center justify-between gap-4 overflow-hidden`}
                  >
                    <div className={`aspect-square  w-1/5 `}>
                      <img className={`w-full h-full  object-cover object-center`} src='/assets/GetStart2.webp' alt='img' />
                    </div>

                    <div className={`grow flex flex-col`}>
                      <p style={{
                        color: Theme.primaryText,
                        fontFamily: Weights.ExtraBold,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1.25}rem`
                      }}
                        className={`break-all select-none line-clamp-1`}
                      >{Project?.ProjectName}</p>
                      <span style={{
                        color: Theme.secText,
                        fontFamily: Weights.SemiBold,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`
                      }}>{`•  ${timeAgo}`}</span>
                    </div>

                    <div onClick={(e) => {
                      e.stopPropagation()
                      toast.info('Adding Soon...')
                    }} className={`p-1 rounded-full flex items-center justify-center`}>
                      <ChevronsUpDown strokeWidth={2.5} size={25} />
                    </div>
                  </div>
                })
                :
                <div
                  style={{
                    fontFamily: Weights.SemiBold,
                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                    color: Theme.secText
                  }}
                  className={`w-full h-full rounded-2xl flex items-center justify-center`}
                >No Project. Start Creating...</div>
            }
          </>
        }






      </div>

    </div >
  )
}

export default Projects
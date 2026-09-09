import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ACCENT_COLORS, COMMON_COLORS } from '../../constants/style'
import { ArrowRight, ChevronsUpDown, ChevronUp, Heart, Search } from "lucide-react"
import { AddToFavourite, setShowCanvas, setWorkingProject } from "../../store/features/Canvas"
import gsap from "gsap"
import { getTimeAgo } from "../../utils/HelperFns"
import { useGSAP } from "@gsap/react"
import { UseDebouncer } from "../../hooks/Debounce"
import { toast } from "react-toastify"

const Projects = () => {

  const dispatch = useDispatch();
  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);
  const AllProjects = useSelector(store => store.Canvas.Projects)

  const FavouriteProjects = AllProjects.filter(({ isFavourite }) => isFavourite)

  const [isFocused, setisFocused] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [projectFilter, setProjectFilter] = useState('All')
  const [searchedProjects, setSearchedProjects] = useState(AllProjects ?? [])

  const [expandProjects, setExpandProjects] = useState(() => {
    if (AllProjects.lenght <= 0) return null
    return AllProjects.reduce((acc, project) => {
      acc[project.ProjectName] = true;
      return acc;
    }, {}) //used to set value true/false which tells to expand or un-expand the project for additional details
  })

  const debouncedValue = UseDebouncer(inputVal, 300)

  useEffect(() => {
    const searchVal = debouncedValue.trim();
    if (searchVal === '') {
      setSearchedProjects(AllProjects);
      return
    }

    setSearchedProjects(() => AllProjects.filter(({ ProjectName }) => ProjectName.startsWith(debouncedValue) ?? [])
    )
  }, [debouncedValue, projectFilter,AllProjects])

  // refs
  const ProjectDetailRef = useRef({}) // used to animate (show/hide) additional details of project

  useGSAP(() => {

    gsap.to(Object.values(ProjectDetailRef.current), {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }, [])

  return (
    <div className={` w-full h-full flex flex-col px-[5%] pt-[5%] gap-2 overflow-hidden`}>

      {/* searchArea */}
      <div
        style={{
          backgroundColor: Theme.header, color: Theme.primaryText,
          borderColor: isFocused ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE : Theme.third
        }}
        className={`mb-1 border flex gap-2 py-2 rounded-2xl ${Device !== 'Desktop' ? 'px-3' : 'px-2.5'}`}>

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

      {/* sections - All/Drafts/Favourite */}
      <div className={`flex items-center gap-2`}>
        {
          [
            { ProjectPage: 'All' },
            { ProjectPage: 'Drafts' },
            { ProjectPage: 'Favourites' },

          ].map(({ ProjectPage }) => {
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

              <div style={{
                borderColor: projectFilter === ProjectPage ?
                  ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE
                  : 'transparent'
              }} className={`border absolute bottom-0 left-0 w-full`}></div>
            </button>
          })
        }

      </div>

      {/* projects */}
      <div className={`grow rounded-2xl w-full flex flex-col gap-2 overflow-y-auto`}>


        {(projectFilter === 'Favourites' && FavouriteProjects.length <= 0) ?
          <div
            style={{
              fontFamily: Weights.SemiBold,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
              color: Theme.secText
            }}
            className={`w-full h-full rounded-2xl flex items-center justify-center`}
          >No Project has been added to Favourites!</div>
          :
          <>
            {
              searchedProjects.length > 0 ?
                searchedProjects.map((Project) => {

                  const timeAgo = getTimeAgo(Project?.updatedAt) // getting times ago it was updated
                  const date = new Date(Project.createAt)
                  const creationDate = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                  if (projectFilter === 'Favourites' && !Project.isFavourite) return;
                  return <div
                    key={Project?.id}
                    onClick={() => {
                      if (expandProjects[Project.ProjectName]) {
                        gsap.to(ProjectDetailRef.current[Project.ProjectName], {
                          height: 'auto',
                          opacity: 1,
                          duration: 0.3,
                          ease: 'power2.out'
                        })
                        setExpandProjects((prevState) => ({ ...prevState, [Project.ProjectName]: false }));
                      } else {
                        gsap.to(ProjectDetailRef.current[Project.ProjectName], {
                          height: 0,
                          opacity: 0,
                          duration: 0.3,
                          ease: 'power2.out'
                        })
                        setExpandProjects((prevState) => ({ ...prevState, [Project.ProjectName]: true }));

                      }
                    }}
                    style={{
                      borderColor: Theme.third,
                      backgroundColor: Theme.header
                    }}
                    className={`relative shrink-0 ${expandProjects[Project?.ProjectName] ? 'active:scale-97' : ''} px-[5%] py-2 rounded-2xl border w-full flex flex-col gap-2 overflow-hidden`}
                  >
                    <div className={`flex items-center justify-between gap-4`}>
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

                      <div
                        style={{
                          color: Theme.primaryText
                        }}
                        className={`p-1 rounded-full flex items-center justify-center`}
                      >
                        {expandProjects[Project?.ProjectName] ? <ChevronsUpDown strokeWidth={2.5} size={25} /> : <ChevronUp strokeWidth={2.5} size={25} />}
                      </div>
                    </div>

                    {/* extra info elem */}
                    <div
                      ref={(el) => {
                        if (el) {
                          ProjectDetailRef.current[Project.ProjectName] = el
                        } else {
                          delete ProjectDetailRef.current[Project.ProjectName];
                        }
                      }}
                      className={`flex flex-col gap-2`}>
                      <div className={`w-full flex items-center justify-center gap-2`}>
                        <p
                          style={{
                            fontFamily: Weights.Bold,
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`,
                            color: Theme.primaryText
                          }}
                          className={`min-w-[35%]`}
                        >Description : </p>
                        <p
                          style={{
                            fontFamily: Weights.SemiBold,
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
                            color: Theme.secText
                          }}
                          className={`flex items-center justify-start grow select-none`}>
                          {Project?.Description === '' ? 'No description added yet.' : Project?.Description}
                        </p>
                      </div>
                      <div className={`flex flex-col gap-0.5`}>
                        <p className={`flex items-center justify-start gap-4`}>
                          <span
                            style={{
                              fontFamily: Weights.Bold,
                              fontSize: `${(Sizes.Small.slice(0, -3)) * 1.15}rem`,
                              color: Theme.primaryText
                            }}
                          >Created : </span>
                          <span
                            style={{
                              fontFamily: Weights.SemiBold,
                              fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
                              color: Theme.secText
                            }}
                          >{creationDate}</span>
                        </p>
                        <p className={`flex items-center justify-start gap-4`}>
                          <span
                            style={{
                              fontFamily: Weights.Bold,
                              fontSize: `${(Sizes.Small.slice(0, -3)) * 1.15}rem`,
                              color: Theme.primaryText
                            }}
                          >Last updated : </span>
                          <span
                            style={{
                              fontFamily: Weights.SemiBold,
                              fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
                              color: Theme.secText
                            }}
                          >{timeAgo?.trim()?.slice(8)}</span>
                        </p>
                        <p className={`flex items-center justify-start gap-4`}>
                          <span
                            style={{
                              fontFamily: Weights.Bold,
                              fontSize: `${(Sizes.Small.slice(0, -3)) * 1.15}rem`,
                              color: Theme.primaryText
                            }}
                          >Status : </span>
                          <span
                            style={{
                              fontFamily: Weights.SemiBold,
                              fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
                              color: Theme.secText
                            }}
                          >Draft</span>
                        </p>
                        <p className={`flex items-center justify-start gap-4`}>
                          <span
                            style={{
                              fontFamily: Weights.Bold,
                              fontSize: `${(Sizes.Small.slice(0, -3)) * 1.15}rem`,
                              color: Theme.primaryText
                            }}
                          >Visibility : </span>
                          <span
                            style={{
                              fontFamily: Weights.SemiBold,
                              fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
                              color: Theme.secText
                            }}
                          >Private</span>
                        </p>
                        <div className={`w-full flex justify-between items-center`}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(AddToFavourite({ id: Project.id, shouldAdd: Project.isFavourite ? false : true }))
                            }}
                            style={{
                              color: Project.isFavourite ?
                                ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').CODE
                                : Theme.primaryText
                            }}
                            className={`p-1.5 rounded-full`}>
                            <Heart
                              fill={Project.isFavourite ?
                                ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').CODE
                                : 'none'
                              }
                              strokeWidth={2}
                              size={20}
                            />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              dispatch(setWorkingProject({ project: Project }))
                              dispatch(setShowCanvas({ showCanvas: true }))
                            }}
                            style={{
                              fontFamily: Weights.Bold,
                              fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                              color: COMMON_COLORS.White,
                              backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE,
                              borderColor: Theme.third
                            }}
                            className={`self-end active:scale-95 border py-1.5 rounded-2xl w-fit px-2 flex items-center gap-0.5`}
                          >
                            <span>Open Project</span>
                            <ArrowRight strokeWidth={2.5} size={16} />
                          </button>
                        </div>
                      </div>
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
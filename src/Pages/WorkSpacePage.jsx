import { useEffect, useRef, useState } from 'react'
import { ALL_SECTIONS, APP_NAME } from '../constants'
import * as ICONS from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { ACCENT_COLORS, COMMON_COLORS, CSS_EASING } from '../constants/style'
import { toast } from 'react-toastify'
import { updateTheme } from '../store/features/DevicePreferences'
import { setActivePage, setCurrentPage } from '../store/features/systemSlice'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Setting from '../components/Settings/Setting'
import Home from '../components/Home/Home'
import Assets from '../components/Assets/Assets'
import Projects from '../components/Projects/Projects'
import Profile from '../components/Profile/Profile'
import NewProjectPopUp from '../components/Common/NewProjectPopUp'
import Canvas from '../canvas/Canvas'


const FILES_SECTIONS = {
    Home,
    Assets,
    Projects,
    Profile
}

const WorkSpacePage = () => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
    const ActivePage = useSelector(store => store.systemSlice.ActivePage)
    const userDetails = useSelector(store => store.systemSlice.userDetails);
    const showCanvas = useSelector(store => store.Canvas.showCanvas)


    //states 
    const [showBurger, setshowBurger] = useState(false)
    const [showNewProjectPopUp, setShowNewProjectPopUp] = useState(false)

    //refs
    const HamBurgerRef = useRef(null) // used to animate hamburger 

    useGSAP(() => {
        if (!HamBurgerRef.current) return;

        // working here
        gsap.fromTo(HamBurgerRef.current, {
            x: showBurger ? '-100%' : '0%',
        }, {
            x: showBurger ? '0%' : '-100%',
            duration: 0.25,
            ease: 'sine.out'
        })
    }, [showBurger])


    // To check if user is missing then just log out
    useEffect(() => {
        if (!userDetails.userName || !userDetails.email || !userDetails.password) {
            dispatch(setCurrentPage({ newPage: 'GetStartedPage' }))
            return;
        }
    }, [dispatch, userDetails])

    return (
        <section className={`relative flex flex-col items-center  select-none w-full h-full overflow-hidden`}>
            <nav style={{
                borderColor: Theme.third,
                backgroundColor: Theme.header
            }} className={`border-b p-[2.5%] w-full flex items-center justify-between`}>
                <div className={`flex gap-2 items-center`}>
                    <img className={`aspect-square w-6 object-cover object-center`} src="/visualUI.webp" alt="Visual UI" />
                    <span
                        style={{
                            color: Theme.primaryText,
                            fontFamily: Weights.ExtraBold,
                            fontSize: `${(Sizes.Regular.slice(0, -3)) * 1}rem`
                        }}
                    >
                        {APP_NAME}</span>
                </div>
                <div
                    onClick={() => setshowBurger(true)}
                    style={{
                        color: Theme.primaryText,
                    }}

                    className={`active:scale-95 flex items-center`}>
                    <ICONS.Menu size={25} strokeWidth={2.5} />
                </div>
            </nav>

            {
                ActivePage !== 'Settings' &&
                <>
                    {/* body */}
                    <div className={`w-full grow h-50 `}>
                        {ALL_SECTIONS.map(({ Section, FileName }) => {
                            const Component = FILES_SECTIONS[FileName]

                            return Component && Section === ActivePage && <div key={Section} className={`w-full h-full overflow-hidden`}>
                                <Component setShowNewProjectPopUp={setShowNewProjectPopUp} />
                            </div>

                        })}
                    </div>

                    {/* footer */}
                    <footer style={{
                        borderColor: Theme.third,
                        backgroundColor: Theme.header
                    }} className={`border-t p-[2.5%] w-full flex justify-center items-center gap-2`}>

                        <div className={` flex gap-2 w-[47%]`}>
                            {
                                [{
                                    page: 'Home',
                                    icon: 'Home'
                                }, {
                                    page: 'Assets',
                                    icon: 'Component'
                                }].map(({ page, icon }) => {
                                    let Icons = ICONS[icon]
                                    return Icons && <div key={page}
                                        onClick={() => dispatch(setActivePage({ newSection: page }))}
                                        className={`active:scale-95 grow w-1/2 rounded-2xl flex flex-col gap-0.5 items-center justify-center`}>
                                        <Icons style={{
                                            color: ActivePage === page ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.primaryText,
                                        }} strokeWidth={2.5} size={20} />

                                        <span
                                            style={{
                                                color: ActivePage === page ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.primaryText,
                                                fontFamily: Weights.SemiBold,
                                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`
                                            }}
                                        >{page}</span>
                                    </div>
                                })
                            }

                        </div>

                        {/* plus */}
                        <div
                            onClick={() => setShowNewProjectPopUp(true)}
                            style={{
                                color: COMMON_COLORS.White,
                                backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE,
                                borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Hover_Clr
                            }}
                            className={`active:scale-95 border rounded-full p-1.5 flex items-center justify-center`}>
                            <ICONS.Plus size={30} strokeWidth={2.5} />
                        </div>

                        {/* right side */}
                        <div className={`flex gap-2 w-[47%]`}>
                            {
                                [{
                                    page: 'Projects',
                                    icon: 'FolderKanban'
                                }, {
                                    page: 'Profile',
                                    icon: 'User'
                                }].map(({ page, icon }) => {
                                    let Icons = ICONS[icon]
                                    return Icons && <div key={page}
                                        onClick={() => dispatch(setActivePage({ newSection: page }))}
                                        className={`active:scale-95 grow w-1/2 rounded-2xl flex flex-col gap-0.5 items-center justify-center`}>
                                        <Icons style={{
                                            color: ActivePage === page ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.primaryText,
                                        }} strokeWidth={2.5} size={20} />
                                        <span
                                            style={{
                                                color: ActivePage === page ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.primaryText,
                                                fontFamily: Weights.SemiBold,
                                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`
                                            }}
                                        >{page}</span>
                                    </div>
                                })
                            }
                        </div>

                    </footer>
                </>
            }

            {ActivePage === 'Settings' && <Setting />}

            {/* hamburger */}
            <section
                onClick={() => setshowBurger(false)}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }} className={`${showBurger ? 'block' : 'hidden'} select-none pt-[5%] absolute inset-0 top-0 left-0 z-100`}>

                <div
                    ref={HamBurgerRef}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        backgroundColor: Theme.header,
                        borderColor: Theme.third
                    }} id='HamBurger-overflow'
                    className={`border w-[75%] h-full flex flex-col gap-7 rounded-2xl overflow-x-hidden overflow-y-auto p-[5%]`}>

                    {/* user name and img to visit profile */}
                    <div className={`shrink-0 flex items-center gap-3 py-2`}>
                        {/* <img src="/" alt="" /> */}
                        <p
                            onClick={() => {
                                dispatch(setActivePage({ newSection: 'Profile' }))
                                setshowBurger(false)
                            }}
                            style={{
                                backgroundColor: Theme.sec,
                                borderColor: Theme.third,
                                color: Theme.primaryText
                            }}
                            className={`border active:scale-95 border flex items-center justify-center p-1 rounded-full overflow-hidden`}>
                            <ICONS.User size={25} strokeWidth={2.5} />
                        </p>
                        <p
                            onClick={() => {
                                dispatch(setActivePage({ newSection: 'Profile' }))
                                setshowBurger(false)
                            }}
                            className={`max-w-[55%] active:scale-95 mr-3 flex flex-col`}>
                            <span style={{
                                color: Theme.primaryText,
                                fontFamily: Weights.ExtraBold,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
                            }}>
                                {userDetails.userName ?? 'Error Fetching'}
                            </span>
                            <span style={{
                                color: Theme.secText,
                                fontFamily: Weights.Bold,
                                fontSize: `${(Sizes.Small.slice(0, 3)) * 0.9}rem`
                            }}>
                                {userDetails.email ?? 'Error!'}
                            </span>
                        </p>
                        <p
                            onClick={() => toast.info('Adding Soon...')}
                            style={{
                                backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Hover_Clr,
                                color: COMMON_COLORS.White,
                                fontFamily: Weights.Bold,
                                fontSize: `${(Sizes.Small.slice(0, 3)) * 0.9}rem`
                            }}
                            className={`active:scale-95 flex items-center justify-center px-1 py-0.5 rounded-lg`}
                        >
                            Pro Plus
                        </p>
                    </div>

                    {/* options */}
                    <div className={`shrink-0  grow flex flex-col gap-2 min-h-[60%]`}>
                        {[
                            {
                                icon: 'Home',
                                option: 'Home'
                            },
                            {
                                icon: 'FolderOpen',
                                option: 'Projects'
                            },
                            {
                                icon: 'LayoutGrid',
                                option: 'Templates'
                            },
                            {
                                icon: 'Component',
                                option: 'Assets'
                            },
                            {
                                icon: 'Settings',
                                option: 'Settings'
                            },
                            {
                                icon: 'BadgeQuestionMark',
                                option: 'Help & Support'
                            }
                        ].map(({ option, icon }) => {
                            const Icon = ICONS[icon];

                            return Icon && <div key={option}
                                onClick={() => {
                                    if (option === 'Home' || option === 'Projects' || option === 'Settings') dispatch(setActivePage({ newSection: option }))
                                    else if (option === 'Templates' || option === 'Assets') dispatch(setActivePage({ newSection: 'Assets' }))
                                    else {
                                        toast.info('Adding Soon...')
                                    }
                                    setshowBurger(false)
                                }} style={{
                                    backgroundColor: ActivePage === option ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr : '',
                                    '--hover': ActivePage === option ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr : Theme.third
                                }}
                                className={`active:scale-97 HOVER_CLASS w-full rounded-xl flex items-center gap-3 px-2.5 py-3`}
                            >
                                <Icon style={{
                                    color: ActivePage === option ?
                                        ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.primaryText,

                                }}
                                    strokeWidth={2.5} size={20} />
                                <span style={{
                                    color: ActivePage === option ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.primaryText,
                                    fontFamily: Weights.Bold,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
                                }}>
                                    {option}
                                </span>
                            </div>
                        })
                        }
                    </div>

                    {/* Theme change and log out area */}
                    <div style={{ borderColor: Theme.third }} className={`shrink-0  border-t flex flex-col gap-2 py-[7%] min-h-[26%]`}>
                        <div
                            onClick={() => dispatch(updateTheme({ newTheme: 'Toggle' }))}
                            style={{
                                '--hover': Theme.third
                            }} className={`HOVER_CLASS active:scale-97 flex items-center justify-between rounded-xl gap-3 px-2.5 py-3 overflow-hidden`}>
                            <div className={`flex gap-3`}>
                                <ICONS.SunMoon style={{
                                    color: Theme.primaryText,
                                }}
                                    strokeWidth={2.5} size={20} />
                                <span style={{
                                    color: Theme.primaryText,
                                    fontFamily: Weights.Bold,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
                                }}>Dark Mode</span>
                            </div>
                            <button
                                style={{
                                    backgroundColor: Theme.Theme === 'Dark' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Green').CODE :
                                        Theme.bg,
                                }}
                                className={`outline-none cursor-pointer relative  w-12 h-6 p-1.5 rounded-full `}>

                                <div style={{
                                    backgroundColor: COMMON_COLORS.White, /* p- 2.25 */
                                    transition: `transform ${Speed} ${CSS_EASING[Animation]}`,
                                    transform: `${Theme.Theme === 'Dark' ? 'translateX(1.3rem)' : 'translateX(0)'}`
                                }} className={`theme-toggle-circle w-4 h-4 absolute top-1  rounded-full 
                                                `}></div>

                            </button>
                        </div>
                        <div
                            onClick={() => dispatch(setCurrentPage({ newPage: 'GetStartedPage' }))}
                            style={{
                                '--hover': Theme.third
                            }} className={`HOVER_CLASS active:scale-97 flex gap-3  items-center rounded-xl px-2.5 py-3 overflow-hidden`} >
                            <ICONS.LogOut style={{
                                color: Theme.primaryText,
                            }}
                                strokeWidth={2.5} size={20} />
                            <span style={{
                                color: Theme.primaryText,
                                fontFamily: Weights.Bold,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
                            }}>Log Out</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* Add new project element */}
            <NewProjectPopUp
                showNewProjectPopUp={showNewProjectPopUp}
                setShowNewProjectPopUp={setShowNewProjectPopUp}
            />


            {/* Canvas itself */}
            {showCanvas && <Canvas
                showBurger={showBurger}
                setshowBurger={setshowBurger}
            />
            }

        </section>
    )
}

export default WorkSpacePage
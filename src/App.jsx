import { useSelector } from "react-redux"
import { useEffect } from "react"
import { CSS_EASING } from "./constants/style"
import { useUpdateDevice } from "./utils/DevicePreferencesFN"
import GetStartedPage from './Pages/GetStartedPage'
import WorkSpacePage from "./Pages/WorkSpacePage"
import LoadingInitialPage from './Pages/LoadingInitialPage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import { Slide, ToastContainer } from "react-toastify";

const ALL_PAGES = {
  'GetStartedPage': GetStartedPage,
  'LoadingInitialPage': LoadingInitialPage,
  'WorkSpacePage': WorkSpacePage,
  'SignUpPage': SignUpPage,
  'LoginPage': LoginPage
}

const App = () => {

  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
  const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);

  const CurrentPage = useSelector(store => store.systemSlice.CurrentPage)
  const CurrentPageComponent = ALL_PAGES[CurrentPage]

  useUpdateDevice();

  useEffect(() => {
    document.documentElement.style.setProperty('--Speed', Speed)
    document.documentElement.style.setProperty('--easing', CSS_EASING[Animation])
  }, [Speed, Animation])


  return (
    <>
      <div id='layoutParent' style={{ backgroundColor: Theme.bg }} className={`relative`}>
        {Device === 'Mobile' ?
          <>
            {
              CurrentPageComponent && <CurrentPageComponent />
            }

          </>
          :
          <div style={{
            color: Theme.primaryText,
            fontFamily: Weights.ExtraBold,
            fontSize: `${(Sizes.Regular.slice(0, -3)) * 1}rem`
          }} className={`overflow-hidden select-none w-full h-full flex items-center justify-center`}>
            This app is only available for Mobiles right now.
          </div>
        }
      </div>

      <ToastContainer
        toastClassName="text-sm select-none md:w-fit"
        toastStyle={{
          width: Device === 'Desktop' ? "340px" : "80vw",
          margin: "0 auto",
          top: '10px',
          backgroundColor: Theme.bg,
          color: Theme.primaryText
        }}
        position="top-center"
        autoClose={2500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={false}
        theme={Theme.Theme}
        transition={Slide} />
    </>
  )
}

export default App
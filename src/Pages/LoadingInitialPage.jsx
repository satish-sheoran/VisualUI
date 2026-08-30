import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { APP_NAME } from '../constants';
import { setCurrentPage } from '../store/features/systemSlice';
import {COMMON_COLORS} from '../constants/style'

const LoadingInitialPage = () => {

  const dispatch = useDispatch()
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);
  const Theme = useSelector((store) => store.Preferences.Theme)
  const Device = useSelector(store => store.Preferences.Device)
  const CurrentPage = useSelector(store => store.systemSlice.CurrentPage)

  useEffect(()=>{
    if(CurrentPage !=='LoadingInitialPage') return;
    let time = setTimeout(()=>dispatch(setCurrentPage({newPage : 'GetStartedPage'})),6000)

    return ()=> clearTimeout(time)
  },[dispatch,CurrentPage])


  return (
    <section style={{
      backgroundImage: `url('/assets/LoadingPageBg.PNG')`
    }} className={`bg-cover bg-center  select-none flex flex-col items-center justify-center w-full h-full overflow-hidden gap-5`}>
      <div className={`flex flex-col items-center gap-0.5`}>
        <img className={`cursor-pointer aspect-square ${Device !== 'Mobile' ? 'w-1/10' : 'w-[25%]'}`} src="/visualUI.webp" alt="VisualUI" />
        <h1
          style={{
            color: COMMON_COLORS.White,
            fontFamily: Weights.ExtraBold,
            fontSize: `${(Sizes.ExtraLarge.slice(0, -3)) * 1.2}rem`
          }}
        >
          {APP_NAME}
        </h1>
        <p
          style={{
            color: Theme.secText,
            fontFamily: Weights.SemiBold,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`
          }}
        >
          Build beautiful interfaces
        </p>
      </div>



      {/* loader */}
      <div className={`flex items-center justify-center w-full h-2`}>

        <div style={{
          borderColor: Theme.bg,
          '--width': Device !== 'Mobile' ? '260px' : '160px',
          '--bg': Theme.Theme === 'Dark' ? 'rgba(233,233,235,0.8)' : 'rgba(0, 0, 0, 0.2)',
          '--bg-filter': Theme.Theme === 'Dark' ? 'blur(1px) saturate(150%)' : 'blur(1px) saturate(180%)',
          '--box-shadow1': Theme.Theme === 'Dark' ? "0 8px 32px rgba(0, 0, 0, 0.15)" : '0 8px 32px rgba(255, 255, 255, 0.35)',
          '--box-shadow2': Theme.Theme === 'Dark' ? "inset 0 1px 0 rgba(7, 7, 7, 0.25)" : 'inset 0 1px 0 rgba(240, 247, 247, 0.55)',
          '--box-shadow3': Theme.Theme === 'Dark' ? "inset 0 -1px 0 rgb(0, 0, 0, 0.08)" : 'inset 0 -1px 0 rgb(255, 255, 255, 0.2)',


        }} className={`Updater overflow-hidden relative ${Device !== 'Mobile' ? 'w-65' : 'w-40'}  max-w-65 h-3 border rounded-lg`}></div>
      </div>
    </section>
  )
}

export default LoadingInitialPage
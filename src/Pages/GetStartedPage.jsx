import { useDispatch, useSelector } from "react-redux";
import { ACCENT_COLORS, COMMON_COLORS, THEMES } from "../constants/style";
import { GET_STARTED_DATA } from "../constants";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useSwiper from "../hooks/Swiper";

const GetStartedPage = () => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const Device = useSelector(store => store.Preferences.Device)
    const CurrentPage = useSelector(store => store.systemSlice.CurrentPage)

    //states
    const [count, setCount] = useState(0)

    // refs
    const countRefInterval = useRef(null);
    const DetailTxtRef = useRef(null);
    const DescTxtRef = useRef(null);
    const ImgRef = useRef(null);
    const directionRef = useRef(null)

    //fn to update count and animation 
    const updateCountRef = useCallback((val) => {
        if (val && val === count) return;
        setCount(old => {
            if (directionRef.current !== null) {
                if (directionRef.current === 'RTL') {
                    let newVal = old - 1;
                    if (newVal < 0) return GET_STARTED_DATA.length - 1;
                    return newVal;
                }
                let newVal = old + 1;
                if (newVal > GET_STARTED_DATA.length - 1) return 0;
                return newVal;
            }
            if (val >= 0 && val <= GET_STARTED_DATA.length - 1) return val
            if (old === GET_STARTED_DATA.length - 1) return 0;
            return old + 1
        })
        const tl = gsap.timeline()
        tl.fromTo(DetailTxtRef.current, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 100,
            duration: 0.45,
            ease: 'sine.out'
        }).fromTo(DescTxtRef.current, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 100,
            duration: 0.45,
            delay: -0.5,
            ease: 'sine.out'
        })
        gsap.fromTo(ImgRef.current, {
            y: 30
        }, {
            y: 0,
            duration: 0.35,
            ease: 'sine.out'
        })
    }, [])

    
    // Swipe fn
    const { Handlers } = useSwiper(50, updateCountRef,directionRef)


    useEffect(() => {
        countRefInterval.current = setInterval(updateCountRef, 5000)

        return () => {
            clearInterval(countRefInterval.current);
            countRefInterval.current = null;
        }
    }, [])


    //initial animation
    useGSAP(() => {
        if (!DetailTxtRef.current || !DescTxtRef.current || !ImgRef.current) return;

        let tl = gsap.timeline()
        tl.fromTo(DetailTxtRef.current, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 100,
            duration: 0.45,
            ease: 'sine.out'
        }).fromTo(DescTxtRef.current, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 100,
            duration: 0.45,
            delay: -0.5,
            ease: 'sine.out'
        })

        gsap.fromTo(ImgRef.current, {
            y: 30
        }, {
            y: 0,
            duration: 0.35,
            ease: 'sine.out'
        })
    }, [])


    return (
        <section className={`pt-[7%] flex flex-col gap-7 select-none w-full h-full overflow-hidden`}>

            <div
                {...Handlers}
                className={`h-[60%] flex flex-col gap-7`}>
                {/* texts */}
                <div className={`h-fit flex flex-col items-center gap-4 overflow-hidden`}>
                    <p ref={DetailTxtRef}
                        style={{
                            color: Theme.primaryText,
                            fontFamily: Weights.ExtraBold,
                            fontSize: `${(Sizes.Large.slice(0, -3)) * 1.35}rem`
                        }}
                        className={`leading-7.5 text-center`}
                    >{GET_STARTED_DATA[count]?.detail}
                    </p>
                    <p ref={DescTxtRef}
                        style={{
                            color: Theme.secText,
                            fontFamily: Weights.SemiBold,
                            fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.8}rem`
                        }}
                        className={`max-w-8/10 text-center`}
                    >{GET_STARTED_DATA[count]?.description}
                    </p>
                </div>

                <div className={`w-full grow flex flex-col items-center justify-center gap-3 overflow-hidden`}>
                    <img ref={ImgRef} className={`aspect-square w-[50%] object-cover object-center`} src={GET_STARTED_DATA[count]?.src} alt="" />
                    <div className={`mt-4 flex items-center justify-center gap-2.5`}>

                        {
                            [...GET_STARTED_DATA].map((item, idx) => {
                                return <p
                                    onClick={() => updateCountRef(idx)}
                                    style={{
                                        backgroundColor: idx === count ? ACCENT_COLORS?.find(({ COLOR }) => COLOR === 'Purple').Hover_Clr : Theme.third
                                    }}
                                    className={`rounded-full ${idx === count ? 'w-3 h-3' : 'w-2.5 h-2.5'} `}></p>
                            })
                        }
                    </div>
                </div>
            </div>


            {/* Buttons */}
            <div className={`py-2 px-[7%] w-full flex flex-col gap-3 items-center justify-center`}>
                <button onClick={() => clearInterval(countRefInterval.current)} style={{
                    color: COMMON_COLORS.White,
                    backgroundColor: COMMON_COLORS.Black,
                    borderColor: Theme.third,
                    fontFamily: Weights.ExtraBold,
                    fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.9}rem`,
                }} className={`active:scale-95 border w-full rounded-2xl py-2`}>Get Started</button>
                <button onClick={() => clearInterval(countRefInterval.current)} style={{
                    color: Theme.Theme !== 'Dark' ? Theme.primaryText : COMMON_COLORS.Black,
                    backgroundColor: COMMON_COLORS.White,
                    borderColor: THEMES['Light'].third,
                    fontFamily: Weights.ExtraBold,
                    fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.9}rem`,
                }} className={`active:scale-95 border w-full rounded-2xl py-2`}>Sign In</button>
            </div>

        </section>
    )
}

export default GetStartedPage
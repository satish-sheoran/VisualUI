import { useSelector } from 'react-redux'
import * as Icons from 'lucide-react'
import { ACCENT_COLORS, COMMON_COLORS } from '../../constants/style'
import { toast } from 'react-toastify'
import gsap from 'gsap'
import {  useRef } from 'react'
import { useGSAP } from '@gsap/react'

const RangeStep = 5

const ContextControls = ({ activeTool, setActiveTool, setOpacity, opacity, showQuickControls, setShowQuickControls, zoom, setZoom, ref }) => {

    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const Device = useSelector(store => store.Preferences.Device)
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)

    // refs
    const QuickControlShowRef = useRef(null)

    useGSAP(() => {
        gsap.set(ref.current, {
            bottom: '-300%',
            opacity: 0
        });
    }, {scope : ref})

    // useGSAP(() => {
    //     gsap.to(QuickControlShowRef.current, {
    //         height: 0,
    //         paddingTop: 0,
    //         paddingBottom: 0,
    //         opacity: 0,
    //         duration: 0.3,
    //         ease: 'power2.out'
    //     })
    // }, [])

    return (
        <div
            ref={ref}
            style={{
                borderColor: Theme.third,
                backgroundColor: Theme.header
            }}
            className={`absolute left-0 bottom-full mb-2 w-full flex flex-col gap-4 border rounded-2xl px-[2.5%] py-4 h-fit`}
        >
            {/* select,drag and zoom controls */}
            <div className={`grid grid-cols-3 gap-2`}>
                {
                    [
                        {
                            Option: 'Select',
                            icon: 'MousePointer',
                            performAction: ''
                        },
                        {
                            Option: 'Drag',
                            icon: 'Hand',
                            performAction: ''
                        },
                        {
                            Option: 'Zoom',
                            icon: 'Search',
                            performAction: ''
                        }
                    ].map(({ Option, icon }) => {
                        const Icon = Icons[icon]
                        return <button
                            key={Option}
                            onClick={() => setActiveTool(Option)}
                            style={{
                                color: Option === activeTool ? COMMON_COLORS.White : Theme.primaryText,
                                backgroundColor: Option === activeTool ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.bg,
                                borderColor: Option === activeTool ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Hover_Clr : Theme.third
                            }}
                            className={`active:scale-95 border flex items-center justify-center gap-1.5 py-2 rounded-2xl`}>
                            {Icon && <Icon strokeWidth={2} size={18} />}
                            <span
                                style={{
                                    fontSize: Sizes.Small,
                                    fontFamily: Weights.Bold
                                }}
                            >
                                {Option}
                            </span>
                        </button>
                    })
                }
            </div>

            {
                activeTool === 'Drag' && <div
                    style={{
                        color: Theme.secText,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                        fontFamily: Weights.SemiBold
                    }}
                    className={`h-[10vh] overflow-hidden grow flex items-center justify-center`}>
                    Drag canvas to navigate
                </div>
            }
            {activeTool === 'Select' && <>
                {/* Insert, layers, properties and settings */}
                {/* 0 ,10,20...100% control of select,drag area or zoom area */}
                <div className={`w-full flex items-center justify-center gap-3`}>
                    <button
                        onClick={() => setOpacity((prev) => prev - RangeStep < 0 ? 0 : prev - RangeStep)}
                        style={{
                            color: Theme.primaryText,
                            backgroundColor: Theme.bg,
                            borderColor: Theme.third
                        }}
                        className={`border flex items-center justify-center p-1.5 rounded-xl active:scale-95`}
                    ><Icons.Minus size={18} /></button>

                    <span
                        style={{
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.05}rem`,
                            fontFamily: Weights.Bold,
                            color: Theme.primaryText
                        }}>
                        Opacity : {opacity}%
                    </span>
                    <input
                        type="range"
                        id='ranger'
                        min='0'
                        max='100'
                        value={opacity}
                        step={RangeStep}
                        className={`grow`}
                        onChange={(e) => setOpacity(Number(e.target.value))}
                    />

                    <button
                        onClick={() => setOpacity((prev) => prev + RangeStep > 100 ? 100 : prev + RangeStep)}
                        style={{
                            color: Theme.primaryText,
                            backgroundColor: Theme.bg,
                            borderColor: Theme.third
                        }}
                        className={`border flex items-center justify-center p-1.5 rounded-xl active:scale-95`}
                    ><Icons.Plus size={18} /></button>
                </div>

                <div className={`grid grid-cols-4 gap-2`}>
                    {
                        [
                            {
                                Option: 'Insert',
                                icon: 'Plus',
                                performAction: ''
                            },
                            {
                                Option: 'Layers',
                                icon: 'Layers',
                                performAction: ''
                            },
                            {
                                Option: 'Properties',
                                icon: 'SlidersHorizontal',
                                performAction: ''
                            },
                            {
                                Option: 'Settings',
                                icon: 'Settings',
                                performAction: ''
                            }
                        ].map(({ Option, icon }) => {
                            const Icon = Icons[icon]
                            return <button
                                key={Option}
                                onClick={() => toast.info('Adding Soon...')}
                                style={{
                                    color: Theme.primaryText,
                                    backgroundColor: Theme.bg,
                                    borderColor: Theme.third,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`,
                                    fontFamily: Weights.Bold
                                }}
                                className={`border flex flex-col items-center justify-center rounded-2xl p-1 active:scale-95`}
                            >
                                {Icon && <Icon size={17} strokeWidth={2} />}
                                <span>{Option}</span>
                            </button>
                        })
                    }
                </div>


                {/* quick controls */}
                <div
                    style={{
                        borderColor: Theme.third,
                        backgroundColor: Theme.header
                    }}
                    className={`border flex flex-col shrink-0  px-[5%] rounded-2xl`}>
                    <div
                        onClick={() => {
                            if (showQuickControls) {
                                gsap.to(QuickControlShowRef.current, {
                                    height: 'auto',
                                    paddingTop: Device !== 'Desktop' ? '0.75rem' : '0.625rem',
                                    paddingBottom: Device !== 'Desktop' ? '0.75rem' : '0.625rem',
                                    opacity: 1,
                                    duration: 0.3,
                                    ease: 'power2.out'
                                })
                                setShowQuickControls(false);
                            } else {
                                gsap.to(QuickControlShowRef.current, {
                                    height: 0,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    opacity: 0,
                                    duration: 0.3,
                                    ease: 'power2.out'
                                })
                                setShowQuickControls(true);

                            }
                        }}
                        className={`flex items-center justify-between  overflow-hidden py-3`}>
                        <div className={` flex items-center gap-1`}>
                            <Icons.Zap style={{ color: Theme.primaryText }} strokeWidth={2.5} size={18} />
                            <span
                                style={{
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                                    fontFamily: Weights.Bold,
                                    color: Theme.primaryText
                                }}
                            >
                                Quick controls
                            </span>
                        </div>
                        {showQuickControls ? <Icons.ChevronDown style={{ color: Theme.primaryText }} strokeWidth={2.5} size={20} />
                            :
                            <Icons.ChevronUp style={{ color: Theme.primaryText }} strokeWidth={2.5} size={20} />
                        }
                    </div>

                    {/* changes details */}
                    <div
                        ref={QuickControlShowRef} style={{ backgroundColor: Theme.header, borderColor: Theme.third }}
                        className={`overflow-hidden border-t gap-2 grid grid-cols-5 py-3`}>
                        {
                            [
                                {
                                    Option: 'Position',
                                    icon: 'Move',
                                    performAction: ''
                                },
                                {
                                    Option: 'Size',
                                    icon: 'SquareDashed',
                                    performAction: ''
                                },
                                {
                                    Option: 'Align',
                                    icon: 'TextAlignStart',
                                    performAction: ''
                                },
                                {
                                    Option: 'Arrange',
                                    icon: 'Layers2',
                                    performAction: ''
                                },
                                {
                                    Option: 'Style',
                                    icon: 'PaintBucket',
                                    performAction: ''
                                }
                            ].map(({ Option, icon }) => {
                                const Icon = Icons[icon]
                                return <button
                                    key={Option}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toast.info('Adding Soon...')
                                    }}
                                    style={{
                                        color: Theme.primaryText,
                                        backgroundColor: Theme.bg,
                                        borderColor: Theme.third,
                                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.8}rem`,
                                        fontFamily: Weights.Bold
                                    }}
                                    className={`border flex flex-col gap-0.5 items-center justify-center rounded-xl p-1 active:scale-95`}
                                >
                                    {Icon && <Icon size={17} strokeWidth={2} />}
                                    <span>{Option}</span>
                                </button>
                            })
                        }

                    </div>
                </div>
            </>
            }

            {
                activeTool === 'Zoom' && <div className={`grow flex flex-col overflow-hidden items-center gap-3`}>
                    {/* 0 ,10,20...100% control of select,drag area or zoom area */}
                    <div className={`w-full flex items-center justify-center gap-3`}>
                        <button
                            onClick={() => setZoom((prev) => prev - RangeStep < 0 ? 0 : prev - RangeStep)}
                            style={{
                                color: Theme.primaryText,
                                backgroundColor: Theme.bg,
                                borderColor: Theme.third
                            }}
                            className={`border flex items-center justify-center p-1.5 rounded-xl active:scale-95`}
                        ><Icons.Minus size={18} /></button>

                        <span
                            style={{
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 1.05}rem`,
                                fontFamily: Weights.Bold,
                                color: Theme.primaryText
                            }}>
                            {zoom}%
                        </span>
                        <input
                            type="range"
                            id='ranger'
                            min='0'
                            max='200'
                            value={zoom}
                            step={RangeStep}
                            className={`grow`}
                            onChange={(e) => setZoom(Number(e.target.value))}
                        />

                        <button
                            onClick={() => setZoom((prev) => prev + RangeStep > 200 ? 200 : prev + RangeStep)}
                            style={{
                                color: Theme.primaryText,
                                backgroundColor: Theme.bg,
                                borderColor: Theme.third
                            }}
                            className={`border flex items-center justify-center p-1.5 rounded-xl active:scale-95`}
                        ><Icons.Plus size={18} /></button>
                    </div>

                    <button
                        disable={Number(zoom) === 100}
                        onClick={() => setZoom(100)}
                        style={{
                            color: COMMON_COLORS.White,
                            backgroundColor: Number(zoom) === 100 ?
                                ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').Hover_Clr
                                : ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').CODE,
                            fontFamily: Weights.Bold,
                            borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').Hover_Clr,
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`
                        }}
                        className={`active:scale-95 px-1.5 py-2 border flex items-center justify-center rounded-xl`}
                    >
                        Reset Zoom
                    </button>
                </div>
            }
        </div>
    )
}

export default ContextControls
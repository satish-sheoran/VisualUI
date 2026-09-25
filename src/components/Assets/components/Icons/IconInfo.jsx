//  COPY FNS NOT WORKING FOR NOW


import { Braces, CodeXml, Maximize2, Minus, PencilLine, Plus, X } from 'lucide-react'
import { ACCENT_COLORS, COMMON_COLORS } from '../../../../constants/style'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { copyToClipboard } from '../../../../utils/HelperFns'

const SizeStep = 2
const StrokeStep = 0.5
const Description = 'Adjust the size and stroke width of the icon to match your style.'
const SizeChange = { title: 'Icon Size', desc: 'Adjust the overall size of the icon.' }
const StrokeWidthChange = { title: 'Stroke Width', desc: 'Adjust the line thickness of the icon.' }
const JSXMsg = { msg: 'Get the React JSX code for this icon.', title: 'Copy JSX' }
const ObjMsg = { msg: 'Get the icon metadata (name, size, etc.).', title: 'Copy Object' }

const IconInfo = ({ ShowIntertion, showIconInfo, setShowIconInfo, IconInfoRef }) => {

    const Device = useSelector(store => store.Preferences.Device)
    const Theme = useSelector((store) => store.Preferences.Theme)
    const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
    const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);

    const [size, setSize] = useState(18)
    const [strokeWidth, setStrokeWidth] = useState(2)

    useGSAP(() => {
        if (!IconInfoRef.current) return;

        gsap.fromTo(IconInfoRef.current, {
            y: !showIconInfo.show ? 0 : -50,
        }, {
            y: !showIconInfo.show ? -50 : 0,
            duration: 0.65,
            force3D: true, //to make animation a bit smooth as it deals with scales (forcw3D)
            ease: 'expo.out'
        })

    }, [showIconInfo.show])

    // FNS
    async function CopyJSX(IconName) {
        const componentCodeString = `
    <${IconName} 
      size={${size}} 
      strokeWidth={${strokeWidth}} 
    />`;

        const copied = await copyToClipboard(componentCodeString);
        if (copied) {
            toast.info("Component copied to clipboard!");
        } else {
            toast.error("Failed to copy component!");
        }
    }
    async function CopyObject(iconName) {
        const obj = {
            name: iconName,
            size: size,
            strokeWidth: strokeWidth
        };

        const copied = await copyToClipboard(JSON.stringify(obj));
        if (copied) {
            toast.info("Metadata copied to clipboard!");
        } else {
            toast.error("Failed to copy metadata!");
        }

    }




    return (
        <div className={`${showIconInfo.show ? 'block' : 'hidden'} sticky z-1 bottom-2 left-0`}>
            <div
                ref={IconInfoRef}
                style={{
                    backgroundColor: Theme.header,
                    borderColor: Theme.third,
                    boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.1)'

                }}
                className={`rounded-2xl border h-full w-full px-[2.5%] py-4 flex flex-col gap-3`}>

                {/*  icon ,name and close */}
                <div className={`flex justify-start gap-2`}>
                    <div
                        style={{
                            backgroundColor: Theme.bg,
                            borderColor: Theme.third
                        }}
                        className={`shrink-0 border grow aspect-square h-full rounded-xl overflow-hidden flex items-center justify-center`}>
                        {showIconInfo.icon.Component && <showIconInfo.icon.Component
                            size={size}
                            strokeWidth={strokeWidth} />
                        }
                    </div>

                    <div className={`max-w-7/10 flex flex-col gap-0.5`}>
                        <span
                            style={{
                                color: Theme.primaryText,
                                fontSize: Sizes.Regular,
                                fontFamily: Weights.ExtraBold
                            }} className={`font-black`}
                        >{showIconInfo?.icon?.name?.replace(/(?=[A-Z])/g, ' ')}</span>
                        <span
                            style={{
                                color: Theme.secText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.8}rem`,
                                fontFamily: Weights.SemiBold
                            }} className={`font-semibold`}
                        >{Description}</span>
                    </div>
                    <div className={`ms-auto`}>
                        <button
                            onClick={() => setShowIconInfo({ show: false, icon: {} })}
                            style={{
                                borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').Bg_Clr,
                                color: COMMON_COLORS.White,
                                backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').Hover_Clr
                            }}
                            className={`border p-1.5 flex items-center justify-center rounded-full active:scale-95`}>
                            <X size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* edits - size and strokeWidth */}
                <div
                    style={{ borderColor: Theme.third }}
                    className={`p-2 border rounded-2xl overflow-hidden flex flex-col items-center gap-1`}>

                    {/* size */}
                    <div className={`w-full flex flex-col gap-2`}>
                        <div className={`flex items-center gap-3`}>
                            <button
                                style={{
                                    borderColor: Theme.third,
                                    backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').Bg_Clr,
                                    color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE
                                }}
                                className={`p-1.5 rounded-lg flex items-center justify-center border`}><Maximize2 size={18} strokeWidth={2.5} /></button>

                            <div className={`flex flex-col gap-0.5`}>
                                <span
                                    style={{
                                        color: Theme.primaryText,
                                        fontSize: Sizes.Small,
                                        fontFamily: Weights.ExtraBold
                                    }} className={`font-black`}
                                >{SizeChange.title}</span>
                                <span
                                    style={{
                                        color: Theme.secText,
                                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                                        fontFamily: Weights.Regular
                                    }}
                                >{SizeChange.desc}</span>
                            </div>
                            <p
                                style={{
                                    color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE,
                                    backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').Bg_Clr,
                                    borderColor: Theme.third,
                                    fontFamily: Weights.SemiBold,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`
                                }}
                                className={`font-semibold ms-auto border py-0.5 px-2 rounded-2xl`}
                            >{size} px</p>
                        </div>

                        {/* input */}
                        <div
                            style={{
                                color: Theme.primaryText,
                                fontSize: Sizes.Small,
                                fontFamily: Weights.Bold
                            }}
                            className={`font-bold w-full flex items-center justify-center gap-2.5`}>
                            <button
                                onClick={() => setSize((prev) => prev - SizeStep < 5 ? 5 : prev - SizeStep)}
                                style={{
                                    color: Theme.primaryText,
                                    backgroundColor: Theme.bg,
                                    borderColor: Theme.third
                                }}
                                className={`border flex items-center justify-center p-1 rounded-xl active:scale-95`}
                            ><Minus size={16} strokeWidth={2.5} /></button>

                            <span
                                style={{
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                                    fontFamily: Weights.Bold,
                                    color: Theme.primaryText
                                }} className={`font-bold`}>
                                {size}
                            </span>
                            <input
                                type="range"
                                id='ranger'
                                min={5}
                                max={50}
                                value={size}
                                step={SizeStep}
                                className={`grow`}
                                onChange={(e) => setSize(Number(e.target.value))}
                            />

                            <button
                                onClick={() => setSize((prev) => prev + SizeStep > 50 ? 50 : prev + SizeStep)}
                                style={{
                                    color: Theme.primaryText,
                                    backgroundColor: Theme.bg,
                                    borderColor: Theme.third
                                }}
                                className={`border flex items-center justify-center p-1 rounded-xl active:scale-95`}
                            ><Plus size={16} strokeWidth={2.5} /></button>
                        </div>
                    </div>

                    <hr style={{
                        color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').Bg_Clr

                    }} className={`border w-9/10 my-3 mx-auto`} />

                    {/* stroke width */}
                    <div className={`w-full flex flex-col gap-2`}>
                        <div className={`flex items-center gap-3`}>
                            <button
                                style={{
                                    borderColor: Theme.third,
                                    backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').Bg_Clr,
                                    color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE
                                }}
                                className={`p-1.5 rounded-lg flex items-center justify-center border`}><PencilLine size={18} strokeWidth={2.5} /></button>
                            <div className={`flex flex-col gap-0.5`}>
                                <span style={{
                                    color: Theme.primaryText,
                                    fontSize: Sizes.Small,
                                    fontFamily: Weights.ExtraBold
                                }} className={`font-black`}>{StrokeWidthChange.title}</span>
                                <span
                                    style={{
                                        color: Theme.secText,
                                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                                        fontFamily: Weights.Regular
                                    }}
                                >{StrokeWidthChange.desc}</span>
                            </div>
                            <p
                                style={{
                                    color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE,
                                    backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').Bg_Clr,
                                    borderColor: Theme.third,
                                    fontFamily: Weights.SemiBold,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`
                                }}
                                className={`font-semibold ms-auto border py-0.5 px-2 rounded-2xl`}
                            >{strokeWidth} px</p>
                        </div>

                        {/* input */}
                        <div className={`w-full flex items-center justify-center gap-2.5`}>
                            <button
                                onClick={() => setStrokeWidth((prev) => prev - StrokeStep < 0.5 ? 0.5 : prev - StrokeStep)}
                                style={{
                                    color: Theme.primaryText,
                                    backgroundColor: Theme.bg,
                                    borderColor: Theme.third
                                }}
                                className={`border flex items-center justify-center p-1 rounded-xl active:scale-95`}
                            ><Minus size={16} strokeWidth={2.5} /></button>

                            <span
                                style={{
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                                    fontFamily: Weights.Bold,
                                    color: Theme.primaryText
                                }} className={`font-bold`}>
                                {strokeWidth}
                            </span>
                            <input
                                type="range"
                                id='ranger'
                                min={0.5}
                                max={8}
                                value={strokeWidth}
                                step={StrokeStep}
                                className={`grow`}
                                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                            />

                            <button
                                onClick={() => setStrokeWidth((prev) => prev + StrokeStep > 8 ? 8 : prev + StrokeStep)}
                                style={{
                                    color: Theme.primaryText,
                                    backgroundColor: Theme.bg,
                                    borderColor: Theme.third
                                }}
                                className={`border flex items-center justify-center p-1 rounded-xl active:scale-95`}
                            ><Plus size={16} strokeWidth={2.5} /></button>
                        </div>

                    </div>
                </div>

                {/* copy sec */}
                {ShowIntertion ?
                    <button
                    onClick={()=>toast.info('Adding soon...')}
                        style={{
                            borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr,
                            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE,
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`,
                            fontFamily: Weights.Bold,
                            color: COMMON_COLORS.White
                        }}
                        className={`font-bold active:scale-95 border rounded-2xl py-2`}
                    >Insert to Canvas</button>
                    : <div className={`grid grid-cols-2 gap-2`}>
                        {/* copy jsx */}
                        <div
                            style={{
                                borderColor: Theme.third
                            }}
                            className={`border flex flex-col px-2 py-1.5 gap-3 items-center justify-center rounded-2xl overflow-hidden`}>
                            <div className={`flex items-start gap-2.5`}>
                                <div
                                    style={{
                                        borderColor: Theme.third,
                                        backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr,
                                        color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE
                                    }}
                                    className={`p-1.5 rounded-lg flex items-center justify-center border`}><CodeXml size={22} strokeWidth={2.5} /></div>

                                <div className={`flex flex-col gap-1`}>
                                    <span
                                        style={{
                                            color: Theme.primaryText,
                                            fontSize: Sizes.Small,
                                            fontFamily: Weights.ExtraBold
                                        }} className={`font-black`}>{JSXMsg.title}</span>
                                    <span
                                        style={{
                                            color: Theme.secText,
                                            fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                                            fontFamily: Weights.Regular
                                        }}>{JSXMsg.msg}</span>
                                </div>

                            </div>

                            <button
                                onClick={() => CopyJSX(showIconInfo?.icon?.name)}
                                style={{
                                    color: COMMON_COLORS.White,
                                    borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').Bg_Clr,
                                    backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').Hover_Clr,
                                    fontSize: Sizes.Small,
                                    fontFamily: Weights.Bold
                                }}
                                className={`font-bold w-full border rounded-2xl py-1.5 active:scale-95`}>{JSXMsg.title}</button>
                        </div>

                        {/* copy object */}
                        <div
                            style={{
                                borderColor: Theme.third
                            }}
                            className={`border flex flex-col px-2 py-1.5 gap-3 items-center justify-center rounded-2xl overflow-hidden`}>
                            <div className={`flex items-start gap-2.5`}>
                                <div
                                    style={{
                                        borderColor: Theme.third,
                                        backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr,
                                        color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE
                                    }}
                                    className={`p-1.5 rounded-lg flex items-center justify-center border`}>
                                    <Braces size={20} strokeWidth={2.5} />
                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <span
                                        style={{
                                            color: Theme.primaryText,
                                            fontSize: Sizes.Small,
                                            fontFamily: Weights.ExtraBold
                                        }} className={`font-black`}
                                    >{ObjMsg.title}</span>
                                    <span
                                        style={{
                                            color: Theme.secText,
                                            fontSize: `${(Sizes.Small.slice(0, -3)) * 0.75}rem`,
                                            fontFamily: Weights.Regular
                                        }}
                                    >{ObjMsg.msg}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => CopyObject(showIconInfo?.icon?.name)}
                                style={{
                                    color: Theme.primaryText,
                                    borderColor: Theme.third,
                                    backgroundColor: Theme.bg,
                                    fontSize: Sizes.Small,
                                    fontFamily: Weights.Bold
                                }}
                                className={`font-bold w-full border rounded-2xl py-1.5 active:scale-95`}>{ObjMsg.title}</button>
                        </div>
                    </div>}


            </div>
        </div>
    )
}

export default IconInfo
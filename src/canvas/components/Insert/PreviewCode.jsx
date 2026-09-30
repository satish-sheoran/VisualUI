import React, { useRef, useState } from 'react'
import { ACCENT_COLORS, COMMON_COLORS } from '../../../constants/style'
import { useSelector } from 'react-redux';
import { Check, Copy, SquareArrowRightEnter } from 'lucide-react';
import { toast } from 'react-toastify';
import { copyToClipboard } from '../../../utils/HelperFns';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const PreviewCode = ({ ref, selectedTag, canCopy, setCanCopy, CopyTimeOutRef }) => {

    //  attribut and html show code 
    const attributesCODE = Object.entries(selectedTag?.attributes || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')

    const HTMLStartCode = [`<${selectedTag?.tag}`, attributesCODE, `className="${selectedTag?.tag}"`, `${selectedTag?.type !== 'input' ? '' : '/'}>`]
    const HTMLEndCode = `</${selectedTag?.tag}>`



    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)


    // copy html preview code
    const copyHTMLCODE = async (Tag, Type, Content, attri) => {
        const attributes = Object.entries(attri)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');

        const contentToCopy = `<${Tag} ${attributes || ''} className="${Tag}"${Type === 'input' ? '/' : ''}>
        ${Content || ''}
        ${Type === 'input' ? '' : `</${Tag}>`}
        `


        const copied = await copyToClipboard(contentToCopy);
        if (copied) {
            toast.info('Copied to Clipboard')
            setCanCopy(false)
            CopyTimeOutRef.current = setTimeout(() => { setCanCopy(true) }, 5000)
        } else {
            toast.info('An Error Occured Copying!')
        }
    }

    // useGSAP(() => {
    //     if (!ref.current) return;

    //     gsap.set(ref.current, {
    //         height: 0,
    //         paddingBottom: 0,
    //         paddingTop: 0,
    //         border: 'none'
    //     })

    // }, [])

    return (
        <div ref={ref}
            style={{
                borderColor: Theme.third,
                backgroundColor: Theme.Theme !== 'Dark' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').Bg_Clr :
                    ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Slate_Gray').Bg_Clr

            }}
            className={`border px-2 py-3 rounded-2xl overflow-x-hidden shrink-0 flex flex-col gap-2`}
        >
            <span
                style={{
                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`,
                    fontFamily: Weights.SemiBold,
                    color: COMMON_COLORS.White,
                    backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE,
                    borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').Hover_Clr
                }}
                className={`active:scale-97 border py-1 px-2 w-fit rounded-2xl`}
            >Preview
            </span>

            {/* default code  */}
            <div className={`flex flex-col gap-2`}>
                <p
                    style={{
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1.15}rem`,
                        fontFamily: Weights.Bold,
                        color: Theme.primaryText
                    }} className={`flex justify-between gap-2 items-center`}>
                    <span>Default Code</span>
                    <span
                        onClick={() => {
                            if (!canCopy) return;
                            copyHTMLCODE(selectedTag?.tag, selectedTag?.type, selectedTag?.content, selectedTag.attributes)
                        }}
                        style={{
                            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE,
                            borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').Hover_Clr,
                            color: COMMON_COLORS.White
                        }}
                        className={`border flex items-center justify-center p-1.5 rounded-lg active:scale-95`}>
                        {canCopy ? <Copy strokeWidth={2} size={18} /> : <Check strokeWidth={2.5} size={18} />}
                    </span>
                </p>
                {/* code */}
                <div
                    style={{
                        borderColor: Theme.Theme !== 'Dark' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').Hover_Clr:
                        ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Slate_Gray').Hover_Clr,
                        backgroundColor: Theme.header
                    }}
                    className={`border py-2 pr-2 pl-4 rounded-2xl flex flex-col justify-center `}>

                    {/* start tag and className */}
                    <p className={`flex flex-wrap gap-0.5 justify-start items-center w-full`}>
                        {
                            HTMLStartCode.map((symbol, idx) => {

                                return <span
                                    key={symbol}
                                    style={{
                                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`,
                                        fontFamily: Weights.SemiBold,
                                        color:
                                            (idx === 0 || idx == HTMLStartCode.length - 1) ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE :
                                                ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Orange').CODE
                                    }}
                                >
                                    {symbol}
                                </span>
                            })
                        }
                    </p>

                    {/* content */}
                    <span
                        style={{
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Lime').CODE,
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`,
                            fontFamily: Weights.SemiBold,
                        }}
                    >{selectedTag?.content?.[0] || ''}</span>

                    {/* tag end */}
                    {selectedTag?.type !== 'input' && <p
                        className={`flex items-center w-fit`}
                        style={{
                            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`,
                            fontFamily: Weights.SemiBold,
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue').CODE
                        }}
                    >
                        {HTMLEndCode}
                    </p>}
                </div>
                {/* properties */}

            </div>

            <div className={`flex flex-col gap-1`}>
                <span
                    style={{
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1.15}rem`,
                        fontFamily: Weights.Bold,
                        color: Theme.primaryText
                    }}
                >Properties</span>
                <div className={`flex flex-col gap-0.5`}>
                    {
                        [
                            { property: 'Tag', value: selectedTag?.tag },
                            { property: 'Class', value: selectedTag?.tag },
                            { property: 'Default text', value: selectedTag?.content }
                        ].map(({ property, value }) => {
                            return <div className={`flex gap-1`}>
                                <p
                                    style={{
                                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                                        fontFamily: Weights.SemiBold,
                                        color: Theme.primaryText
                                    }} className={`w-[35%]`}
                                >{property}</p>
                                <p
                                    style={{
                                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                                        fontFamily: Weights.Regular,
                                        color: Theme.secText
                                    }}
                                >{value}</p>
                            </div>
                        })
                    }
                </div>
            </div>

            {/* insert button */}
            <button
                onClick={() => toast.info('Adding...')}
                style={{
                    borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple')?.Bg_Clr,
                    backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue')?.CODE,
                    fontSize: `${(Sizes.Small.slice(0, -3)) * 1.1}rem`,
                    fontFamily: Weights.SemiBold,
                    color: COMMON_COLORS.White
                }}
                className="flex items-center justify-center gap-2 font-semibold active:scale-95 border rounded-xl px-2 py-1.5 cursor-pointer"
            >
                <SquareArrowRightEnter strokeWidth={2} size={22} />
                <span>Insert to Canvas</span>
            </button>

        </div>
    )
}

export default PreviewCode
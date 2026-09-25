import gsap from 'gsap';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ACCENT_COLORS, COMMON_COLORS } from '../../constants/style';
import { X } from 'lucide-react';
import HTMLElements from './Insert/HTMLElements';
import Templates from '../../components/Assets/components/Templates'
import AssetsSec from '../../components/Assets/components/AssetsSec'

const InsertPages = ['Elements', 'Templates', 'Assets']

const Insert = ({ ref, setActiveOverlayData }) => {

    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)

    // states
    const [activeInsertPage, setActiveInsertPage] = useState('Elements')

    function Close() {
        gsap.to(ref.current, {
            bottom: '-300%',
            opacity: 0,
            duration: 0.25,
            ease: 'sine.out'
        })
        setActiveOverlayData('')
    }

    return (
        <div
            style={{
                backgroundColor: Theme.header,
            }}
            className={`w-full h-[75vh] flex flex-col gap-0 rounded-2xl pb-4 px-0 pt-0 overflow-x-hidden overflow-y-auto`}>
            <div
                style={{
                    backgroundColor: Theme.header
                }} className={`w-full flex items-center justify-end px-2 py-2`}>
                <button
                    onClick={() => Close()}
                    style={{
                        color: COMMON_COLORS.White,
                        borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').Hover_Clr,
                        backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red').CODE
                    }}
                    className={`border h-full p-0.5 aspect-square 
                               rounded-full flex items-center justify-center active:scale-95`}>
                    <X strokeWidth={2} size={22} />
                </button>
            </div>
            <hr style={{ borderColor: Theme.third }} className={`border-t mx-auto w-[95%]`} />

            <div className={`px-2 pt-3 grow w-full overflow-hidden rounded-2xl flex flex-col gap-2`}>
                {/* all insert page */}

                <div className={`shrink-0 grid grid-cols-3 w-full gap-2 overflow-hidden`}>
                    {
                        InsertPages.map((section) => {
                            return <button
                                key={section}
                                onClick={() => setActiveInsertPage(section)}
                                style={{
                                    borderColor: activeInsertPage === section ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr : Theme.third,
                                    backgroundColor : activeInsertPage === section ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : '',
                                    color : activeInsertPage === section ? COMMON_COLORS.White : Theme.primaryText,
                                    fontFamily : Weights.SemiBold,
                                    fontSize : `${(Sizes.Small.slice(0,-3))*1.2}rem`
                                }}
                                className={`border py-1 rounded-2xl`}
                            >
                                {section}
                            </button>
                        })
                    }
                </div>


                {activeInsertPage === 'Elements' && <HTMLElements />}
                {activeInsertPage === 'Templates' && <Templates />}
                {activeInsertPage === 'Assets' && <AssetsSec ShowIntertion={true}/>}
            </div>
        </div>
    )
}

export default Insert
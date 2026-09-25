import React from 'react'
import * as Icons from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ACCENT_COLORS, COMMON_COLORS } from '../../constants/style'
import gsap from 'gsap'

const PrimaryControls = ({
    activeOverlayData, setActiveOverlayData, ref
}) => {

    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)


    function AnimateOverlay(value) {
        if (!ref.current) return;

        if (!value) {
            gsap.to(ref.current, {
                bottom: '-300%',
                opacity: 0,
                duration: 0.25,
                ease: 'sine.out'
            })
            setActiveOverlayData('')
        } else {
            gsap.to(ref.current, {
                bottom: '100%',
                opacity: 1,
                duration: 0.5,
                ease: 'circ.out'
            })
            setActiveOverlayData(value)
        }
    }

    return (
        <div
            style={{
                borderColor: Theme.third,
                backgroundColor: Theme.header
            }}
            className={`relative border rounded-3xl grid grid-cols-5 px-[2.5%] pt-2 pb-2 gap-4 overflow-hidden`}>

            {
                [
                    {
                        Control: 'Insert',
                        icon: 'Plus',
                    },
                    {
                        Control: 'Layers',
                        icon: 'Layers',
                    },
                    {
                        Control: 'Preview',
                        icon: 'Play',
                    },
                    {
                        Control: 'Settings',
                        icon: 'Settings',
                        performAction: ''
                    },
                    {
                        Control: 'More',
                        icon: 'Ellipsis',
                    },
                ].map(({ Control, icon }) => {

                    const Icon = Icons[icon]
                    return <div
                        key={Control}
                        onClick={() => {
                            if (Control !== 'More' && Control !== 'Settings' && Control !== 'Insert') {
                                toast.info('Adding Soon...')
                                return;
                            }
                            if (!activeOverlayData) {
                                AnimateOverlay(Control)
                                return;
                            }
                            if (Control === activeOverlayData) {
                                AnimateOverlay('')
                                return;
                            }
                            AnimateOverlay(Control)

                        }}
                        className={`active:scale-95 overflow-hidden flex flex-col items-center justify-center gap-0`}>
                        <button
                            style={{
                                backgroundColor: Control === 'Insert' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : '',
                                borderColor: Control === 'Insert' || Control === 'Preview' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Hover_Clr : Theme.primaryText
                            }}
                            className={`
                                        ${Control === 'Insert' || Control === 'Preview' ? 'border' : ''} 
                                        p-2 rounded-full flex items-center justify-center`}>

                            {
                                Icon && <Icon
                                    fill={Control === 'Preview' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : 'none'}
                                    style={{
                                        color: Control === 'Insert' ?
                                            COMMON_COLORS.White : Control === 'Preview' ?
                                                ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE
                                                : Theme.primaryText
                                    }}
                                    size={22}
                                    strokeWidth={2.5}
                                />
                            }

                        </button>
                        <span
                            style={{
                                fontSize: Sizes.Small,
                                fontFamily: Weights.ExtraBold,
                                color: Control === 'Insert' ? ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE : Theme.secText
                            }} className={`font-black`}
                        >
                            {Control}
                        </span>
                    </div>
                })
            }
        </div>
    )
}

export default React.memo(PrimaryControls)
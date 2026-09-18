import React from 'react'
import { useSelector } from 'react-redux';
import { APP_NAME, APP_VERSION } from '../../constants';
import { COMMON_COLORS } from '../../constants/style';

const About = () => {

    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)


    return (
        <div style={{
            borderColor: Theme.third,
            backgroundColor: Theme.sec
        }}
            className={`border px-3 py-2.5 w-full flex flex-col gap-2 rounded-2xl`}>

            <div className={`w-full flex flex-col gap-2`}>

                <div className={`w-full flex flex-col`}>
                    <span style={{
                        color: Theme.primaryText,
                        fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.85}rem`,
                        fontFamily: Weights.SemiBold,
                    }}>{APP_NAME}</span>
                    <span style={{
                        color: Theme.secText,
                        fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.65}rem`,
                        fontFamily: Weights.SemiBold,
                    }}>{APP_VERSION}</span>
                </div>
                <div className={`w-full flex flex-col`}>
                    <span style={{
                        color: Theme.primaryText,
                        fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.75}rem`,
                        fontFamily: Weights.SemiBold,
                    }}>Build :  2026.09.14</span>
                </div>
            </div>

            <hr className={`border w-full`} />

            <div className={`flex flex-col gap-2`}>
                <span style={{
                    color: Theme.primaryText,
                    fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.75}rem`,
                    fontFamily: Weights.SemiBold,
                }}>Made with : </span>

                <div className={`flex gap-2 items-center`}>
                    {
                        [
                            {
                                technology: 'React'
                            },
                            {
                                technology: 'Redux'
                            },
                            {
                                technology: 'GSAP'
                            },
                            {
                                technology: 'Tailwind'
                            }
                        ].map(({ technology }) => {
                            return <span style={{
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.65}rem`,
                                fontFamily: Weights.SemiBold,
                            }}>• {technology}</span>
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default About
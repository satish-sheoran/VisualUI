// When user clicks settings icon of canvas in primaryControls then this page opens settings app in overlay just like 'more' named options of primary Control 

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import Setting from "../../components/Settings/Setting";
import { X } from "lucide-react";
import { ACCENT_COLORS, COMMON_COLORS } from "../../constants/style";
import { toast } from "react-toastify";


const LoadSettingsPage = ({ ref,setActiveOverlayData }) => {

    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)

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
            className={`w-full h-[70vh] flex flex-col gap-0 rounded-2xl pb-4  overflow-x-hidden overflow-y-auto`}>
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
            <Setting />
        </div>
    )
}

export default LoadSettingsPage
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import CanvasNav from './components/CanvasNav';
import CanvasArea from './components/CanvasArea';
import PrimaryControls from './components/PrimaryControls';
import ContextControls from './components/ContextControls';
import LoadSettingsPage from './components/LoadSettingsPage';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Insert from './components/Insert';

const Canvas = ({ showBurger, setshowBurger }) => {

    const Theme = useSelector((store) => store.Preferences.Theme)

    // states
    const [showQuickControls, setShowQuickControls] = useState(false)
    const [activeTool, setActiveTool] = useState('Select')
    const [zoom, setZoom] = useState(100)
    const [opacity, setOpacity] = useState(100)
    const [activeOverlayData, setActiveOverlayData] = useState('')


    // refs
    const OverlayRef = useRef(null)

    useGSAP(() => {
        gsap.set(OverlayRef.current, {
            bottom: '-300%',
            opacity: 0
        });
    }, { scope: OverlayRef })

    return (
        <section
            style={{
                backgroundColor: Theme.bg,
                borderColor: Theme.third,
            }}
            className={`border overflow-hidden absolute inset-0 z-2`}
        >

            <div className={`flex flex-col w-full h-full overflow-hidden`}>

                <CanvasNav setshowBurger={setshowBurger} />

                {/* canvas itself */}
                <CanvasArea />


                <footer className={` relative px-[2.5%] py-2`}>
                    <div className={`relative flex flex-col gap-5 w-full`}>

                        <div
                            ref={OverlayRef}
                            style={{
                                borderColor: Theme.third,
                                backgroundColor: Theme.header
                            }}
                            className={`absolute left-0 bottom-full mb-2 w-full flex flex-col gap-4 border rounded-2xl ${activeOverlayData === 'Settings' || activeOverlayData === 'Insert' ? '' : 'px-[2.5%] py-4'}  h-fit`}
                        >
                            {/* overlay where we do select ,drag, insert inside that element */}
                            {activeOverlayData === 'More' &&
                                <ContextControls
                                    activeTool={activeTool}
                                    setActiveTool={setActiveTool}
                                    setOpacity={setOpacity}
                                    opacity={opacity}
                                    showQuickControls={showQuickControls}
                                    setShowQuickControls={setShowQuickControls}
                                    zoom={zoom}
                                    setZoom={setZoom}
                                />}

                            {/* overlay of settings */}
                            {activeOverlayData === 'Settings' &&
                                <LoadSettingsPage
                                    ref={OverlayRef}
                                    setActiveOverlayData={setActiveOverlayData}
                                />}

                            {/* overlay of settings */}
                            {activeOverlayData === 'Insert' &&
                                <Insert
                                    ref={OverlayRef}
                                    setActiveOverlayData={setActiveOverlayData}
                                />}

                        </div>





                        {/* bottom controls : Inset,Preview,Setting,more and layers */}
                        <PrimaryControls
                            activeOverlayData={activeOverlayData}
                            setActiveOverlayData={setActiveOverlayData}
                            ref={OverlayRef}

                        />
                    </div>
                </footer>
            </div>
        </section>
    )
}

export default Canvas
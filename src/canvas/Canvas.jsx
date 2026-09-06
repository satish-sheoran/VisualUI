import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import CanvasNav from './components/CanvasNav';
import CanvasArea from './components/CanvasArea';
import PrimaryControls from './components/PrimaryControls';
import ContextControls from './components/ContextControls';

const Canvas = ({ showBurger, setshowBurger }) => {

    const Theme = useSelector((store) => store.Preferences.Theme)

    // states
    const [showQuickControls, setShowQuickControls] = useState(false)
    const [activeTool, setActiveTool] = useState('Select')
    const [zoom, setZoom] = useState(100)
    const [opacity, setOpacity] = useState(100)
    const [showContextControl, setShowContextControl] = useState(false)

    // refs
    const ContextControlRef = useRef(null) // ref used to animate (show/hide) context controls

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

                        {/* overlay where we do select ,drag, insert inside that element */}
                        <ContextControls
                            activeTool={activeTool}
                            setActiveTool={setActiveTool}
                            setOpacity={setOpacity}
                            opacity={opacity}
                            showQuickControls={showQuickControls}
                            setShowQuickControls={setShowQuickControls}
                            zoom={zoom}
                            setZoom={setZoom}
                            ref={ContextControlRef}
                        />

                        {/* bottom controls : Inset,Preview,Setting,more and layers */}
                        <PrimaryControls
                            ContextControlRef={ContextControlRef}
                            showContextControl={showContextControl}
                            setShowContextControl={setShowContextControl}
                        />
                    </div>
                </footer>
            </div>
        </section>
    )
}

export default Canvas
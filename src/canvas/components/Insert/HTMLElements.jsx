import { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { ELEMENTS } from '../../../constants/Elements/ElemDefinition';
import ElementCard from './ElementCard';
import PreviewCode from './PreviewCode';

const HTMLElements = ({closeOverlay}) => {

    const Theme = useSelector((store) => store.Preferences.Theme)

    // state
    const [selectedTag, setSelectedTag] = useState({})
    const [canCopy, setCanCopy] = useState(true)

    // ref
    const PreviewRef = useRef(null); // used to animate Preview Area (show/hidden with animations)
    const ParentBoxRef = useRef(null) // used to scroll to top when user preview code
    const CopyTimeOutRef = useRef(null) // used to let user stop from copying again and again by setting up a timeout

    return (
        <div
            ref={ParentBoxRef}
            style={{
                borderColor: Theme.third
            }}
            className={`border-t relative w-full grow overflow-x-hidden overflow-y-auto flex flex-col gap-4 px-1 pt-[5%]`}>

            {/* previewer */}
            <PreviewCode
                ref={PreviewRef}
                selectedTag={selectedTag}
                canCopy={canCopy}
                setCanCopy={setCanCopy}
                CopyTimeOutRef={CopyTimeOutRef}
                closeOverlay={closeOverlay}  />

            {ELEMENTS.map((element) => {
                return <ElementCard
                    key={element.id}
                    ParentBoxRef={ParentBoxRef}
                    element={element}
                    setSelectedTag={setSelectedTag}
                    setCanCopy={setCanCopy}
                    CopyTimeOutRef={CopyTimeOutRef}
                    PreviewRef={PreviewRef}
                    closeOverlay={closeOverlay} 
                />
            })}

        </div>
    )
}

export default HTMLElements
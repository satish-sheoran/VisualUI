
import Color from '../../../style-panel/COMMON/Color'
import Opacity from '../../../style-panel/COMMON/Opacity'
import FontWeight from '../../../style-panel/TextRelated/FontWeight'
import FontSize from '../../../style-panel/TextRelated/FontSize'
import TextChange from '../../../style-panel/TextRelated/TextChange'
import { useSelector } from 'react-redux'


const TextSelectControls = () => {

    const Theme = useSelector((store) => store.Preferences.Theme)

    return (
        <div
            style={{
                borderColor: Theme.third
            }}
            className={`flex flex-col gap-3`}
        >

            {/* text change */}
            <TextChange />

            {/* font size change */}
            <FontSize />

            {/*  font weight */}
            <FontWeight />

            {/* opacity */}
            <Opacity />

            {/* text color change */}
            <Color />

        </div>
    )
}

export default TextSelectControls
import { useDispatch, useSelector } from 'react-redux';
import * as ICONS from 'lucide-react'
import { setSelectedElement } from '../../../../store/features/Canvas';
import { ACCENT_COLORS } from '../../../../constants/style';

const Icon = ({ details }) => {

    const dispatch = useDispatch()
    // const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    // const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const AccentColor = useSelector((store) => store.systemSlice.Settings['Appearance']['accent-color'])

    // selected Element, currently activeElement is used to determine which element is selected in the canvas.
    const selectedElement = useSelector((store) => store.Canvas.selectedElement)


    const IconComponent = ICONS[details.tag]
    const style = {
        ...details.styles,
        color: Theme.primaryText,
        borderColor: selectedElement.uniqueCode === details.uniqueCode ? ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE : Theme.third,
        borderRadius: '10px',
        left: details.x,
        top: details.y,
        width: details.width,
        height: details.height
    }

    return (
        IconComponent ? <IconComponent
            onClick={(e) => {
                e.stopPropagation();
                dispatch(setSelectedElement({ element: details }))
            }}
            className={`absolute`}
            style={style}
            size={details.attributes.size}
            strokeWidth={details.attributes.strokeWidth}
        />
            :
            <></>
    )
}

export default Icon
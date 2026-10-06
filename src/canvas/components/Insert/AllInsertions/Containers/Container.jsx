import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedElement } from '../../../../../store/features/Canvas';
import { ACCENT_COLORS } from '../../../../../constants/style';

const Container = ({ details }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const AccentColor = useSelector((store) => store.systemSlice.Settings['Appearance']['accent-color'])

    // selected Element, currently activeElement is used to determine which element is selected in the canvas.
    const selectedElement = useSelector((store) => store.Canvas.selectedElement)

    const style = {
        ...details.styles,
        color: Theme.primaryText,

        borderColor:
            (Object.keys(selectedElement || {}).length && selectedElement?.uniqueCode === details?.uniqueCode)
                ? ACCENT_COLORS.find(({ COLOR }) => COLOR === AccentColor).CODE
                : Theme.third,

        borderRadius: '10px',
        padding: '2px 5px',
        left: details.x,
        top: details.y,
        width: details.width,
        height: details.height,
        fontSize: Sizes.Regular,
        fontWeight: Weights.SemiBold
    }

    return (
        <details.tag
            onClick={(e) => {
                e.stopPropagation();
                dispatch(setSelectedElement({ element: details }))
            }}
            style={style}
            className={`absolute`}
        >
            {details.content}
        </details.tag>
    )
}

export default Container
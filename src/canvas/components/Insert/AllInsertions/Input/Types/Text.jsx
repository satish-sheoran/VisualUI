import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedElement, updateAddedElementInProject } from '../../../../../../store/features/Canvas';
import { ACCENT_COLORS } from '../../../../../../constants/style';

const Text = ({ details }) => {

  const dispatch = useDispatch()
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);
  const Theme = useSelector((store) => store.Preferences.Theme)
  const AccentColor = useSelector((store) => store.systemSlice.Settings['Appearance']['accent-color'])
  const activeProject = useSelector((store) => store.Canvas.WorkingProject)

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

  // states
  const [inputVal, setInputVal] = useState(details?.attributes?.value || '');

  const syncInnerTextToStore = (value) => {
    const sharedEleme = { ...details, attributes: { ...details.attributes, value } }

    dispatch(updateAddedElementInProject({ projectId: activeProject?.id, elemCode: details.uniqueCode, updatedElement: sharedEleme }))
  }

  return (
    <input
      value={inputVal}
      onChange={(e) => {
        setInputVal(e.target.value)
        syncInnerTextToStore(e.target.value)
      }}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedElement({ element: details }))
      }}
      style={style}
      type='text'
      className={`absolute outline-none`}
      placeholder={details.attributes.placeholder}
    />

  )
}

export default Text
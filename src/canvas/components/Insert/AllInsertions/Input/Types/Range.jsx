import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedElement, updateAddedElementInProject } from '../../../../../../store/features/Canvas';
import { ACCENT_COLORS } from '../../../../../../constants/style';

const Range = ({ details }) => {

  const dispatch = useDispatch()
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);
  const Theme = useSelector((store) => store.Preferences.Theme)
  const activeProject = useSelector((store) => store.Canvas.WorkingProject)

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
    width: 'fit',
    height: details.height,
    fontSize: Sizes.Regular,
    fontWeight: Weights.SemiBold
  }

  // states
  const [minValue, setMinValue] = useState(details.attributes.min || 0);
  const [maxValue, setMaxValue] = useState(details.attributes.max || 100);
  const [currentValue, setCurrentValue] = useState(details.attributes.defaultValue || 50);

  
  const syncValueToStore = (value) => {

    const sharedEleme = { ...details, attributes: { ...details.attributes, defaultValue: value } }

    dispatch(updateAddedElementInProject({ projectId: activeProject?.id, elemCode: details.uniqueCode, updatedElement: sharedEleme }))
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedElement({ element: details }))
      }}
      style={style}
      className={`absolute w-fit flex items-center justify-center gap-2`}>
      <button
        onClick={() => {
          syncValueToStore(currentValue - 1 < minValue ? minValue : currentValue - 1)
          setCurrentValue((prev) => prev - 1 < minValue ? minValue : prev - 1)
        }}
        style={{
          color: Theme.primaryText,
          backgroundColor: Theme.header,
          borderColor: Theme.third
        }}
        className={`border flex items-center justify-center p-1 rounded-xl active:scale-95`}
      ><Minus size={18} /></button>

      <span
        style={{
          fontSize: `${(Sizes.Small.slice(0, -3)) * 1.05}rem`,
          fontFamily: Weights.Bold,
          color: Theme.primaryText
        }}
        className={`w-8 text-center font-bold`}
      >
        {currentValue}
      </span>
      <input
        type="range"
        id='ranger'
        min={minValue}
        max={maxValue}
        value={currentValue}
        step={1}
        className={`w-fit`}
        onChange={(e) => {
          syncValueToStore(Number(e.target.value))
          setCurrentValue(Number(e.target.value))
        }}
      />

      <button
        onClick={() => {
          syncValueToStore(currentValue + 1 > maxValue ? maxValue : currentValue + 1)
          setCurrentValue((prev) => prev + 1 > maxValue ? maxValue : prev + 1)
        }}
        style={{
          color: Theme.primaryText,
          backgroundColor: Theme.header,
          borderColor: Theme.third
        }}
        className={`border flex items-center justify-center p-1 rounded-xl active:scale-95`}
      ><Plus size={18} /></button>
    </div>

  )
}

export default Range
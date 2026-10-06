import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedElement, setShowCanvas, setWorkingProject } from "../../store/features/Canvas";
import Icon from './Insert/AllInsertions/Icon'
import Text from "./Insert/AllInsertions/Texts/Text";
import Input from "./Insert/AllInsertions/Input/Input";
import Container from "./Insert/AllInsertions/Containers/Container";
const CanvasArea = () => {

  const dispatch = useDispatch()
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);
  const Theme = useSelector((store) => store.Preferences.Theme)
  const activeProject = useSelector((store) => store.Canvas.WorkingProject)

  // selected Element, currently activeElement is used to determine which element is selected in the canvas.
  const selectedElement = useSelector((store) => store.Canvas.selectedElement)


  useEffect(() => {
    if (activeProject) return;
    dispatch(setShowCanvas({ showCanvas: false }))
    dispatch(setWorkingProject({ project: null }))
  }, [activeProject])


  return (
    <section className={`relative flex grow overflow-hidden`}>

      {/*  scrollable viewport */}
      <div className={`h-full w-full overflow-auto`}>

        {/* actual Canvas */}
        <div id="canvas"
          onClick={() => dispatch(setSelectedElement({ element: {} }))}
          className={`relative border border-red-400 w-screen h-screen overflow-hidden`}>
          {
            activeProject.elements && activeProject.elements.length > 0 ?
              activeProject.elements.map((element) => {
                if (element.type === 'Icon') {
                  return <Icon
                    key={element.uniqueCode}
                    details={element}
                  />
                }

                if (element.type === 'text') {
                  return <Text
                    key={element.uniqueCode}
                    details={element}
                  />
                }

                if (element.type === 'input') {
                  return <Input
                    key={element.uniqueCode}
                    details={element}
                  />
                }

                if (element.type === 'container') {
                  return <Container
                    key={element.uniqueCode}
                    details={element}
                  />
                }

                return null;
              })
              :
              <div>Canvas area</div>
          }
        </div>

      </div>
    </section>
  )
}

export default CanvasArea
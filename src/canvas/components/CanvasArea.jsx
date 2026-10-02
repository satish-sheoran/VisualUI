import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowCanvas, setWorkingProject } from "../../store/features/Canvas";

const CanvasArea = () => {

  const dispatch = useDispatch()
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);
  const Theme = useSelector((store) => store.Preferences.Theme)
  const activeProject = useSelector((store) => store.Canvas.WorkingProject)


  useEffect(() => {
    if (activeProject) return;
    dispatch(setShowCanvas({ showCanvas: false }))
    dispatch(setWorkingProject({ project: null }))
  }, [activeProject])

  return (
    <section className={`relative flex grow overflow-hidden`}>
      <div id="canvas" className={`relative border border-red-400 grow w-full overflow-auto`}>

        Canvas area

      </div>
    </section>
  )
}

export default CanvasArea
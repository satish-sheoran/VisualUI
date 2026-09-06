import * as Icons from 'lucide-react'
import { setShowCanvas, setWorkingProject } from '../../store/features/Canvas'
import { useDispatch, useSelector } from 'react-redux'

const CanvasNav = ({ setshowBurger }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const WorkingProject = useSelector(store => store.Canvas.WorkingProject)

    return (
        <nav style={{
            borderColor: Theme.third,
            backgroundColor: Theme.header
        }} className={`border-b p-[2.5%] w-full flex gap-4 items-center justify-between`}>
            <div
                onClick={() => {
                    dispatch(setShowCanvas({ showCanvas: false }))
                    dispatch(setWorkingProject({ project: null }))
                }}
                className={`h-full`}>
                <Icons.ArrowLeft size={22} strokeWidth={2.5} />
            </div>
            <p
                style={{
                    color: Theme.primaryText,
                    fontFamily: Weights.Bold,
                    fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.8}rem`
                }}
                className={`grow text-center break-all
 select-none line-clamp-1 font-bold `}
            >
                {WorkingProject?.ProjectName || 'Untitled'}</p>
            <div
                onClick={() => setshowBurger(true)}
                style={{
                    color: Theme.primaryText,
                }}

                className={`active:scale-95 flex items-center`}>
                <Icons.Menu size={22} strokeWidth={2.5} />
            </div>
        </nav>
    )
}

export default CanvasNav
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { projectSchema } from "../../constants/Schemas";
import { ACCENT_COLORS, COMMON_COLORS } from "../../constants/style";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AddProject, setShowCanvas, setWorkingProject } from "../../store/features/Canvas";
import { toast } from "react-toastify";

const NewProjectPopUp = ({ showNewProjectPopUp, setShowNewProjectPopUp }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)
    const Device = useSelector(store => store.Preferences.Device)
    const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
    const ActivePage = useSelector(store => store.systemSlice.ActivePage)
    const userDetails = useSelector(store => store.systemSlice.userDetails);

    // refs
    const refElem = useRef(null)
    const descElemRef = useRef(null)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(projectSchema)
    })

    // auto increasing height of title and desc textarea based on content height
    const handleSize = (el) => {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }

    //form submit handler
    const SubmitProjectForm = (data) => {
        const { ProjectName, Description } = data;
        const date = new Date()
        reset();
        toast.success(`New Project Created`)


        const project = {
            // id: crypto.randomUUID(), //problem with it 
            ProjectName,
            Description,
            createAt: date.getTime(),
            updatedAt: date.getTime(),
            hasShared : false,
            canvas: {
                width: 250,
                height: 250
            },
            elements: []
        }
        dispatch(AddProject({ project }))
        dispatch(setWorkingProject({ project }))
        setShowNewProjectPopUp(false)
        dispatch(setShowCanvas({ showCanvas: true }))
    }

    useGSAP(() => {
        if (!refElem.current) return;

        gsap.fromTo(refElem.current, {
            scale: showNewProjectPopUp ? 0 : 1,
            y: showNewProjectPopUp ? -100 : 0,
            transformOrigin: "center center",
        }, {
            y: showNewProjectPopUp ? 0 : -100,
            scale: showNewProjectPopUp ? 1 : 0,
            duration: 0.32,
            ease: 'power1.inOut'
        })

    }, [showNewProjectPopUp])


    return (

        <div
            onClick={() => {
                setShowNewProjectPopUp(false)
                reset();
                if (descElemRef.current) {
                    descElemRef.current.style.height = 'auto';
                    descElemRef.current.rows = 1;
                }
            }}
            className={`${showNewProjectPopUp ? 'block' : 'hidden'} flex items-start pt-[5%] justify-center absolute inset-0 z-1 overflow-hidden
                    bg-[rgba(0,0,0,0.5)]
                    `}>
            <div
                ref={refElem}
                onClick={(e) => {
                    e.stopPropagation()
                }}
                style={{
                    backgroundColor: Theme.header,
                    borderColor: Theme.third
                }}
                className={`border px-2 py-3 w-[95%] max-h-3/4 overflow-y-auto rounded-2xl overflow-x-hidden`}>

                <form
                    onSubmit={handleSubmit(SubmitProjectForm)}
                    className={`px-[5%] flex flex-col gap-2 w-full`}>

                    {/* Project Name */}
                    <div className={`relative flex flex-col gap-1`}>
                        <label htmlFor="ProjectName"
                            style={{
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.8}rem`,
                                fontFamily: Weights.Bold
                            }}
                        >Project Name</label>
                        <input
                            {...register('ProjectName')}
                            id="ProjectName"
                            name="ProjectName"
                            type="text"
                            placeholder="e.g. Finance Dashboard"
                            style={{
                                borderColor: Theme.third,
                                backgroundColor: Theme.header,
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
                                fontFamily: Weights.Bold
                            }}
                            className={`px-2 py-2.5 rounded-xl border outline-0`}
                        />
                        {errors?.ProjectName?.message && <p style={{
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red')?.CODE,
                            fontFamily: Weights.Bold,
                            fontSize: Sizes.Small
                        }} >• {errors.ProjectName.message}</p>}
                    </div>

                    {/* Description */}
                    <div className={`relative flex flex-col gap-1`}>
                        <label htmlFor="Description"
                            style={{
                                color: Theme.primaryText,
                                fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.8}rem`,
                                fontFamily: Weights.Bold
                            }}
                        >Description</label>

                        <div
                            style={{
                                borderColor: Theme.third,
                                backgroundColor: Theme.header,
                            }}
                            className={`border rounded-xl w-full max-h-37.5 overflow-y-auto overflow-x-hidden`}>
                            <textarea
                                ref={descElemRef}
                                onInput={(e) => handleSize(e.target)}
                                rows={1}
                                maxLength={300}
                                {...register('Description')}
                                id="Description"
                                name="Description"
                                type="text"
                                placeholder="What are you designing?"
                                style={{
                                    color: Theme.primaryText,
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
                                    fontFamily: Weights.Bold
                                }}
                                className={`w-full px-2 py-2.5  outline-0`}
                            />
                        </div>
                        {errors?.Description?.message && <p style={{
                            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red')?.CODE,
                            fontFamily: Weights.Bold,
                            fontSize: Sizes.Small
                        }} >• {errors.Description.message}</p>}
                    </div>


                    <button
                        type="submit"
                        style={{
                            borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr,
                            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE,
                            color: COMMON_COLORS.White,
                            fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.8}rem`,
                            fontFamily: Weights.Bold
                        }}
                        className={`mt-2 border py-2 rounded-2xl active:scale-97`}
                    >Create Project</button>
                </form>

            </div>

        </div>
    )
}

export default NewProjectPopUp
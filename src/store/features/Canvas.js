import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const defaulSettings = {
    showCanvas: false,
    Projects: [],
    WorkingProject: null
}

const getCanvasProject = () => {
    try {
        const CanvasProject = JSON.parse(localStorage.getItem('CanvasProject'));
        if (Array.isArray(CanvasProject) && CanvasProject !== null) {
            const Projects = CanvasProject ?? [];
            return Projects
        }
        return undefined;
    } catch {
        return undefined
    }

}

const CanvasSlice = createSlice({
    name: 'Canvas',
    initialState: {
        showCanvas: defaulSettings.showCanvas,
        Projects: getCanvasProject() ?? defaulSettings.Projects,
        WorkingProject: null
    },
    reducers: {
        setShowCanvas(state, action) {
            const { showCanvas } = action.payload;
            if (typeof showCanvas !== 'boolean') return;
            state.showCanvas = showCanvas;
        },
        AddProject(state, action) {
            const { project } = action.payload

            if (!project) return;
            state.Projects = [project, ...state.Projects]

            //  Save the state directly to localStorage
            localStorage.setItem('CanvasProject', JSON.stringify([...state.Projects]))
        },
        AddToFavourite(state, action) {
            const { id ,shouldAdd} = action.payload;
            if (!id) return;
            // 1. Update the state by mapping through the projects
            state.Projects = state.Projects.map((Project) =>
                Project.id === id
                    ? { ...Project, isFavourite : shouldAdd }
                    : Project
            );

            // 2. Save the updated state directly to localStorage
            localStorage.setItem('CanvasProject', JSON.stringify([...state.Projects]))

        },
        setWorkingProject(state, action) {
            const { project } = action.payload
            state.WorkingProject = project;
        }
    }
})

export const { setShowCanvas, AddProject, setWorkingProject, AddToFavourite } = CanvasSlice.actions;

export default CanvasSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";


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
            state.Projects = [...state.Projects, project]

            localStorage.setItem('CanvasProject', JSON.stringify([...state.Projects]))
        },
        setWorkingProject(state, action) {
            const { project } = action.payload
            state.WorkingProject = project;
        }
    }
})

export const { setShowCanvas, AddProject, setWorkingProject } = CanvasSlice.actions;

export default CanvasSlice.reducer;
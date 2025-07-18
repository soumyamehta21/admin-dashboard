import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectsData } from "../../data/projectsData";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return projectsData;
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectData) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newProject = {
      ...projectData,
      id: Date.now(),
    };
    return newProject;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, projectData }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { id, ...projectData };
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return id;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    items: projectsData,
    loading: false,
    error: null,
    filters: {
      search: "",
      status: "",
      dateRange: [],
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { search: "", status: "", dateRange: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters } = projectsSlice.actions;
export default projectsSlice.reducer;

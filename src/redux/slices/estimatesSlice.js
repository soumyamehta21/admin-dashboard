import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { estimatesData } from "../../data/constants";

const formatDate = (date = new Date()) => {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const fetchEstimates = createAsyncThunk(
  "estimates/fetchEstimates",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return estimatesData;
  }
);

export const addEstimate = createAsyncThunk(
  "estimates/addEstimate",
  async (estimateData) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newEstimate = {
      ...estimateData,
      id: Date.now(),
      version: `${String(Date.now()).slice(-5)}`,
      createdDate: formatDate(),
      lastModified: formatDate(),
    };
    return newEstimate;
  }
);

export const updateEstimate = createAsyncThunk(
  "estimates/updateEstimate",
  async ({ id, estimateData }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      id,
      ...estimateData,
      lastModified: formatDate(),
    };
  }
);

export const deleteEstimate = createAsyncThunk(
  "estimates/deleteEstimate",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return id;
  }
);

const estimatesSlice = createSlice({
  name: "estimates",
  initialState: {
    items: estimatesData,
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
      .addCase(fetchEstimates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEstimates.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEstimates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEstimate.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEstimate.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteEstimate.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters } = estimatesSlice.actions;
export default estimatesSlice.reducer;

// jobSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (page) => {
  const response = await fetch(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 10,
        offset: page * 10,
      }),
    }
  );
  const data = await response.json();
  console.log(data);
  return data.jdList;
});

// filtering logic here
const filterJobs = (jobs, filters) => {
  let filteredJobs = jobs;
  console.log("filters", filteredJobs, filters);
  filters.forEach((filter) => {
    switch (filter.filterType) {
      case "experience":
        filteredJobs = filteredJobs.filter((job) => job.minExp >= filter.value);
        break;
      case "minbasepay":
        filteredJobs = filteredJobs.filter(
          (job) => job.minJdSalary >= filter.value
        );
        break;
      case "location":
        filteredJobs = filteredJobs.filter((job) => {
          const jobLocation = job.location.toLowerCase();
          switch (filter.value.toLowerCase()) {
            case "remote":
              return jobLocation === "remote";
            case "hybrid":
              return jobLocation === "hybrid";
            case "on-site":
              return jobLocation !== "remote" && jobLocation !== "hybrid";
            default:
              return false;
          }
        });
        break;
      case "companyName":
        filteredJobs = filteredJobs.filter((job) => {
          const jobCompanyName = job.companyName.toLowerCase();
          return jobCompanyName.includes(filter.value.toLowerCase());
        });
        break;
      case "jobRole":
        filteredJobs = filteredJobs.filter((job) => {
          const jobCompanyName = job.jobRole.toLowerCase();
          return jobCompanyName.includes(filter.value.toLowerCase());
        });
        break;
      default:
        break;
    }
  });

  return filteredJobs;
};

const jobSlice = createSlice({
  name: "filters",
  initialState: {
    jobs: [],
    filters: [],
    filteredJobs: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      const filters = action.payload.map((filter) => ({
        filterType: filter.filterType,
        value: filter.value,
      }));

      const existingFilters = [...state.filters];

      filters.forEach((filter) => {
        // if filter already exists
        const existingFilterIndex = existingFilters.findIndex(
          (f) => f.filterType === filter.filterType
        );
        if (existingFilterIndex !== -1) {
          // Update existing filter
          existingFilters[existingFilterIndex].value = filter.value;
        } else {
          // Add new filter
          existingFilters.push(filter);
        }
      });
      const filteredJobs = filterJobs(state.jobs, existingFilters);
      state.filteredJobs = filteredJobs;
      state.filters = existingFilters;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = [...state.jobs, ...action.payload];
        console.log(state.jobs, "oo");
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setJobs, setFilter } = jobSlice.actions;

export default jobSlice.reducer;

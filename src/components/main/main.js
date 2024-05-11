import React, { useEffect } from "react";
import JobCard from "../jobs/jobCard";
import "./main.css";
import { useSelector, useDispatch } from "react-redux";
import FilterComponent from "../filter/filter";
import { fetchJobs } from "../../filterSlice";

const MainComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
  const isLoading = useSelector((state) => state.filters.isLoading);
  const error = useSelector((state) => state.filters.error);
  const originalJobs = useSelector((state) => state.filters.jobs);
  const filteredJobs = useSelector((state) => state.filters.filteredJobs);
  const jobsToDisplay = useSelector((state) => {
    if (state.filters.filters && state.filters.filters.length > 0) {
      return filteredJobs;
    } else {
      return originalJobs;
    }
  });
  return (
    <>
      <FilterComponent />
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="wrapper">
              {isLoading ? (
                <p>Loading jobs...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : jobsToDisplay && jobsToDisplay.length > 0 ? (
                jobsToDisplay.map((job, index) => (
                  <div className="app-card" key={index}>
                    <JobCard job={job} />
                  </div>
                ))
              ) : (
                <p>No jobs found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;

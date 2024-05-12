import React, { useEffect, useState, useRef, useCallback } from "react";
import JobCard from "../jobs/jobCard";
import "./main.css";
import { useSelector, useDispatch } from "react-redux";
import FilterComponent from "../filter/filter";
import { fetchJobs } from "../../filterSlice";
const MainComponent = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const isLoading = useSelector((state) => state.filters.isLoading);
  const error = useSelector((state) => state.filters.error);
  const originalJobs = useSelector((state) => state.filters.jobs);
  const hasMore = useSelector((state) => state.filters.hasMore);
  const filteredJobs = useSelector((state) => state.filters.filteredJobs);
  const jobsToDisplay = useSelector((state) => {
    if (state.filters.filters && state.filters.filters.length > 0) {
      return filteredJobs;
    } else {
      return originalJobs;
    }
  });
  const observer = useRef(null);
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (hasMore) {
      dispatch(fetchJobs(page));
    }
  }, [dispatch, page, hasMore]);
  return (
    <>
      <FilterComponent />
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="wrapper">
              {jobsToDisplay && jobsToDisplay.length > 0 ? (
                jobsToDisplay.map((job, index) => {
                  if (jobsToDisplay.length == index + 1) {
                    return (
                      <div
                        ref={lastElementRef}
                        className="app-card"
                        key={index}
                      >
                        <JobCard job={job} />
                      </div>
                    );
                  } else {
                    return (
                      <div className="app-card" key={index}>
                        <JobCard job={job} />
                      </div>
                    );
                  }
                })
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

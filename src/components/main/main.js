import React, { useEffect, useState, useRef } from "react";
import JobCard from "../jobs/jobCard";
import "./main.css";
import { useSelector, useDispatch } from "react-redux";
import FilterComponent from "../filter/filter";
import { fetchJobs } from "../../filterSlice";
import InfiniteScroll from "react-infinite-scroll-component";
const MainComponent = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const lastElementRef = useRef(null);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  useEffect(() => {
    dispatch(fetchJobs(page));
  }, [dispatch, page]);
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

  const loadMoreJobs = () => {
    setPage((prevPage) => prevPage + 1);

    setShowLoadingMessage(true);
    setTimeout(() => {
      dispatch(fetchJobs(page));
      setShowLoadingMessage(false);
    }, 500);
  };

  return (
    <>
      <FilterComponent />
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="wrapper">
              {isLoading || showLoadingMessage ? (
                <p>Loading jobs...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : jobsToDisplay && jobsToDisplay.length > 0 ? (
                <InfiniteScroll
                  dataLength={jobsToDisplay.length}
                  next={loadMoreJobs}
                  hasMore={true}
                  loader={<h4>Loading...</h4>}
                  className="infinite-scroll-content"
                >
                  {jobsToDisplay.map((job, index) => (
                    <div className="app-card" key={index}>
                      <JobCard job={job} />
                    </div>
                  ))}
                </InfiniteScroll>
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

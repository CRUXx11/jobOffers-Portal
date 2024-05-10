import React, { useState, useEffect } from "react";
import JobCard from "../jobs/jobCard";
import './main.css'
const MainComponent = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log("Fetching data...");
    const fetchJobs = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 10,
        offset: 0
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };

      try {
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        const result = await response.json();
        setJobs(result.jdList); // assuming result is an array of job objects
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
    setIsLoading(false);
  }, []);

  return (
    <><div className="jumbotron">
      <div className="container">
        <div className="row">
          <div className="wrapper">
            {isLoading ? (
              <p>Loading jobs...</p>
            ) : (
              jobs.map((job, index) => (
                <div className="app-card" key={index}>
                  <JobCard job={job} />
                </div>
              ))
            )}
          </div></div>
      </div>
    </div></>
  );
};

export default MainComponent;
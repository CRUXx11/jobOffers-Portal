import React from "react";
import './jobCard.css';

const JobCard = ({ job }) => {
  const { companyName, jdLink, jdUid, jobDetailsFromCompany, jobRole, location, logoUrl, maxExp, maxJdSalary, minExp, minJdSalary, salaryCurrencyCode  } = job;

  return (
    <div >
    {companyName} {jobRole}{location}
</div>
  );
};

export default React.memo(JobCard);
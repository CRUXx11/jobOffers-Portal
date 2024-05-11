import React from "react";
import './jobCard.css';

const JobCard = ({ job }) => {
  const { companyName, jdLink, jdUid, jobDetailsFromCompany, jobRole, location, logoUrl, maxExp, maxJdSalary, minExp, minJdSalary, salaryCurrencyCode  } = job;

  return (
    <div className="job-card">
        <div className="flex-item posted"> ⌛Posted 30 days ago</div>
        <div className="flex-item companyDetails">
            <img className=" flex-item companyIcon" src={logoUrl} alt={companyName} />
            <div className="details">
                <div className="companyName">{companyName}</div>
                <div className="jobRole cap">{jobRole}</div>
                <div className="location cap">{location}</div>
            </div>
        </div>
        <div className="flex-item salary">Estimated Salary : ₹ {minJdSalary || 0} - {maxJdSalary} LPA ✅</div>
        <div className="flex-item about">
          <div className="aboutText">About Company:</div>
          <div className="aboutUs">
            <div className="aboutTextIn">About Us</div>
            <div className="description">{jobDetailsFromCompany}</div>
          </div>
        </div>
        <div className="overlay">
          <div className="viewJob"> <a href={jdLink} target="_blank" rel="noopener noreferrer">view job</a></div>
          <div className="apply"> <div className="exp">Minimum Experience</div><div className="years">
  {minExp && minExp + " years"}
</div>
          <div className="flex-item buttons">
            <button className="button easyApply">⚡ Easy Apply</button>
            <button className="button referrals">Unlock referral asks</button>
          </div>
          </div>
   
        </div>
    </div>
  );
};

export default (React.memo(JobCard));

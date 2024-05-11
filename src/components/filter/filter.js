import React, { useState, useEffect } from "react";
import "./filter.css";
import { useDispatch } from "react-redux";
import { setFilter } from "../../filterSlice";

const FilterComponent = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // Dispatch the setFilter action whenever filters state changes
    console.log("dispatch filers", filters);
    dispatch(setFilter(filters));
  }, [filters, dispatch]); // Depend on filters and dispatch

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (f) => f.filterType === filterType
      );
      if (existingFilterIndex !== -1) {
        // Update the existing filter
        const newFilters = [...prevFilters];
        newFilters[existingFilterIndex].value = value;
        console.log("Updated filters:", newFilters);
        return newFilters;
      } else {
        // Add a new filter
        const newFilters = [...prevFilters, { filterType, value }];
        console.log("Updated filters:", newFilters);
        return newFilters;
      }
    });
  };

  return (
    <div className="filters">
      <form className="form-flex">
        <div className="form-group">
          {filters.find((filter) => filter.filterType === "experience") && (
            <label htmlFor="experience" className="form-label">
              Experience
            </label>
          )}
          <div>
            <select
              className="form-control"
              id="experience"
              defaultValue=""
              onChange={(event) =>
                handleFilterChange("experience", event.target.value)
              }
            >
              <option value="" disabled hidden>
                Experience
              </option>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={`${index + 1}`}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          {filters.find((filter) => filter.filterType === "minbasepay") && (
            <label htmlFor="minbasepay" className="form-label">
              Min Base Pay
            </label>
          )}
          <div>
            <select
              className="form-control"
              id="minbasepay"
              defaultValue=""
              onChange={(event) =>
                handleFilterChange("minbasepay", event.target.value * 10)
              }
            >
              <option value="" disabled hidden>
                Min Base Pay
              </option>
              {[...Array(8)].map((_, index) => (
                <option key={index + 1} value={`${index + 1}`}>
                  {index * 10} L
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          {filters.find((filter) => filter.filterType === "location") && (
            <label htmlFor="location" className="form-label">
              Location
            </label>
          )}
          <div>
            <select
              className="form-control"
              id="location"
              defaultValue=""
              onChange={(event) =>
                handleFilterChange("location", event.target.value)
              }
            >
              <option value="" disabled hidden>
                Location
              </option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-Site</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          {filters.find((filter) => filter.filterType === "companyName") && (
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
          )}

          <input
            type="text"
            className="form-control"
            id="companyName"
            placeholder="Company Name"
            onChange={(event) =>
              handleFilterChange("companyName", event.target.value)
            }
          />
        </div>
      </form>
    </div>
  );
};

export default FilterComponent;

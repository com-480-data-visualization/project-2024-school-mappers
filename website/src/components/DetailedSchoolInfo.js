import React, { forwardRef } from "react";
import SchoolImages from "./SchoolImages";

const DetailedSchoolInfo = forwardRef(
  ({ school, onSelectPicture, onSelectCountry }, ref) => {
    if (!school) return null;

    const handlePictureClick = (pictureType) => {
      onSelectPicture(pictureType, school);
    };

    return (
      <div
        ref={ref}
        className={`big-card country-${school.schoolCountry
          .toLowerCase()
          .replace(/\s/g, "")}`}
      >
        <div className="school-header">
          <div>
            <h2 onClick={() => onSelectCountry(school.schoolCountry)}>
              <strong>
                {school.schoolName}, {school.city} ({school.schoolCountry})
              </strong>
            </h2>
            <p >
              
            </p>
          </div>

          <div className="school-data">
            <h4>Size</h4>
            <p>{school.areaSqM} m2</p>
          </div>
          <div className="school-data">
            <h4>Income</h4>
            <p>${school.medianAnnualHouseholdIncomeUSD}</p>
          </div>
          <div className="school-data">
            <h4>Tuition</h4>
            <p>${school.annualTuitionUSD}</p>
          </div>
        </div>

        <div className="card">
          <SchoolImages school={school} onSelectPicture={handlePictureClick} />
        </div>
      </div>
    );
  }
);

export default DetailedSchoolInfo;

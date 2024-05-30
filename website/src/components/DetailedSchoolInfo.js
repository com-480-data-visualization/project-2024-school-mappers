import React, { forwardRef } from 'react';

const DetailedSchoolInfo = forwardRef(({ school, onSelectPicture, onSelectCountry }, ref) => {
  if (!school) return null;

  const pictureLabels = [
    "Cafeteria",
    "Classroom",
    "Library",
    "Playground",
    "Sports Field",
    "Swimming Pool",
    "Sattelite View",
    "School Building",
  ];

  return (
    <div ref={ref} className="card detailed-school-info">
      <h2>
        <strong>
          {school.name}, {school.city} 
        </strong>
      </h2>
      <button onClick={() => onSelectCountry(school.country)}>
        a school in {school.country}
      </button>

      <div className="card-content">
        <div className="card">
          <p>
            <strong>Value:</strong> {school.value}
          </p>
          <p>
            <strong>Year:</strong> {school.year}
          </p>
          <p>
            <strong>Description:</strong> {school.description}
          </p>
          <p>
            <strong>Source:</strong> {school.source}
          </p>
        </div>

        <div className="card">
          <h3>Pictures from the School</h3>
          {/** TODO: add the picture labels */}
          <div className="pictures">
            {school.pictures.map((picture, index) => (
              <img
                key={index}
                src={"./school.jpg"}
                alt={"a school picture"}
                onClick={() => onSelectPicture(picture.type)}
                className="school-picture"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default DetailedSchoolInfo;

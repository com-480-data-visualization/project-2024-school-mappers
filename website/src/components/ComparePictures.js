import React, { forwardRef } from "react";

const ComparePictures = forwardRef(
  ({ pictureType, selectedSchool, otherSchools, onSelectSchool }, ref) => {
    if (!selectedSchool) return null;
    const imageLabels = {
      sat: "Satellite View",
      cafe: "Cafeteria",
      patio: "Patio",
      hallway: "Hallway",
      sport: "Sports Area",
      playground: "Playground",
      Auditorium: "Auditorium",
      lab: "Laboratory",
      classroom: "Classroom",
      library: "Library",
      main: "Main Building",
      arts: "Arts Area",
      music: "Music Room",
    };

    return (
      <div ref={ref} className="big-card">
        <h2>{imageLabels[pictureType]}</h2>
        <div className="card-content">
          <div className="school-pictures">
          <img
              src={`${process.env.PUBLIC_URL}/images/${selectedSchool[pictureType]}`}
              alt={imageLabels[pictureType]}
              className="school-picture"
            />
            {otherSchools.map((school, index) => (
              <img
                className="school-picture"
                key={index}
                src={`${process.env.PUBLIC_URL}/images/${school[pictureType]}`}
                alt={`Other School ${index + 1}`}
                onClick={() => onSelectSchool(school)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ComparePictures;

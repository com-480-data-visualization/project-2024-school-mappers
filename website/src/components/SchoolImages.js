import React from "react";

const SchoolImages = ({ school, onSelectPicture }) => {
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
    <div className="school-images">
      {Object.entries(imageLabels).map(([key, label]) =>
        school[key] ? (
          <div key={key}>
            <p>{label}</p>
            <img
              className="school-picture"
              src={`${process.env.PUBLIC_URL}/images/${school[key]}`}
              alt={label}
              onClick={() => onSelectPicture(key)}
            />
          </div>
        ) : null
      )}
    </div>
  );
};
export default SchoolImages;

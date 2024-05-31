import React, { forwardRef } from "react";

const SchoolPicture = forwardRef(({ pictureType, onSelectSchool }, ref) => {
  const schools = [
    {
      name: "School A",
      city: "City A",
      country: "Country A",
      value: 100,
      year: 2023,
      description: "A school description",
      source: "A school source",
      pictures: [
        { type: "Cafeteria", url: "./school.jpg" },
        { type: "Classroom", url: "./school.jpg" },
        { type: "Library", url: "./school.jpg" },
        { type: "Playground", url: "./school.jpg" },
        { type: "Sports Field", url: "./school.jpg" },
        { type: "Swimming Pool", url: "./school.jpg" },
        { type: "Sattelite View", url: "./school.jpg" },
        { type: "School Building", url: "./school.jpg" },
      ],
    },
    {
      name: "School B",
      city: "City B",
      country: "Country B",
      value: 200,
      year: 2023,
      description: "A school description",
      source: "A school source",
      pictures: [
        { type: "Cafeteria", url: "./school.jpg" },
        { type: "Classroom", url: "./school.jpg" },
        { type: "Library", url: "./school.jpg" },
        { type: "Playground", url: "./school.jpg" },
        { type: "Sports Field", url: "./school.jpg" },
        { type: "Swimming Pool", url: "./school.jpg" },
        { type: "Sattelite View", url: "./school.jpg" },
        { type: "School Building", url: "./school.jpg" },
      ],
    },
  ];

  return (
    <div ref={ref} className="big-card">
      <h2>{pictureType}</h2>
      <div className="card-content">
        <div className="card big-picture">
          <p>big picture</p>
        </div>
        <div className="pictures">
          {schools.map((school, index) => (
            <img
              key={index}
              src={school.pictures.find((p) => p.type === pictureType).url}
              alt={pictureType}
              onClick={() => onSelectSchool(school)}
              className="school-picture"
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default SchoolPicture;


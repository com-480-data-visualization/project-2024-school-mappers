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
    <div ref={ref} className="big-card">
      <div className='school-header'>
        <h2>
          <strong>
            {school.name}, {school.city} 
          </strong>
        </h2>
        <button onClick={() => onSelectCountry(school.country)}>
          {school.country}
        </button>

        <div className='school-data'>
          <h4>Size</h4>
          <p>{school.size}</p>
        </div>
        <div className='school-data'>
          <h4>Income</h4>
          <p>{school.income}</p>
        </div>
        <div className='school-data'>
          <h4>Tuition</h4>
          <p>{school.tuition}</p>
        </div>
      </div>
      
        <div className="card">
          {/** TODO: add the picture labels */}
          <div className="pictures">
            {school.pictures.map((picture, index) => (
              <img
                key={index}
                src={school.pictures[index].url}
                alt={"a school picture"}
                onClick={() => onSelectPicture(picture.type)}
                className="school-picture"
              />
            ))}
        </div>
      </div>
    </div>
  );
});

export default DetailedSchoolInfo;

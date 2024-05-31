import React from "react";

const Header = () => {
  return (
    <header className="big-card header">
      <h1>Education Diversity Across the World 🌍 </h1>

      <h3>
        A Visual Exploration of Schools in the USA, Mexico, Switzerland, India,
        and Japan
      </h3>
      <div className="description">
      <p>
        Welcome to our data visualization project where we explore educational
        diversity across five countries: USA, Mexico, Switzerland, India, and
        Japan. This project combines macro-level statistics with micro-level
        insights to provide a comprehensive understanding of education in
        different regions. We have selected a range of schools from each country
        to highlight the varied educational environments and experiences.
      </p>
      <p>
        Our project is divided into three main sections: a detailed view of each
        school, a comparison of schools across countries, and a comparison of
        specific features of schools. You can navigate through the project by
        clicking on elements in the cards and images.
      </p>
    </div>
    </header>
  );
};

export default Header;

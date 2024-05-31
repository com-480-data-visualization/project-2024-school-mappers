import Header from "./components/Header";
import CountryCards from "./components/CountryCards";
import DetailedCountryInfo from "./components/DetailedCountryInfo";
import DetailedSchoolInfo from "./components/DetailedSchoolInfo";
import ComparePictures from "./components/ComparePictures";
import CompareData from "./components/CompareData";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [allSchoolsData, setAllSchoolsData] = useState([]);
  const [cardList, setCardList] = useState([]);
  const cardRefs = useRef([]);

  // Fetch the countries data
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/countries.json`)
      .then((response) => response.json())
      .then((data) => setCountriesData(data))
      .catch((error) => console.error("Error fetching the JSON file:", error));
  }, []);

  // Fetch the schools data
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/schools.json`)
      .then((response) => response.json())
      .then((data) => setAllSchoolsData(data))
      .catch((error) => console.error("Error fetching the JSON file:", error));
  }, []);

  // Scroll to the last card when a new card is added
  useEffect(() => {
    if (cardList.length > 0) {
      cardRefs.current[cardList.length - 1].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [cardList]);

  // Handle the selection of a country
  const handleSelectCountry = (countryName, clearList = false) => {
    const countryData = countriesData.find((c) => c.name === countryName);
    const schoolsData = allSchoolsData.filter((school) => school.schoolCountry === countryName);

    if (countryData) {
      const newCountryCard = {
        type: "country",
        data: { countryData, schoolsData },
      };
      if (clearList) {
        setCardList([newCountryCard]);
      } else {
        setCardList((previousCards) => [...previousCards, newCountryCard]);
      }
    }
  };

  // Handle the selection of a school
  const handleSelectSchool = (school) => {
    setCardList((previousCards) => [
      ...previousCards,
      {
        type: "school",
        data: school,
      },
    ]);
  };

  // Handle the selection of a school picture
  const handleSelectSchoolPicture = (pictureType, selectedSchool) => {
    const otherSchools = allSchoolsData.filter((school) => school.schoolName !== selectedSchool.schoolName);

    setCardList((previousCards) => [
      ...previousCards,
      {
        type: "pictures",
        data: { pictureType, selectedSchool, otherSchools },
      },
    ]);
  };

  // Handle the selection of a variable
  const handleSelectVariable = (variable) => {
    setCardList((previousCards) => [
      ...previousCards,
      {
        type: "variable",
        data: variable,
      },
    ]);
  };

  return (
    <div className="App">
      <Header />
      <CountryCards
        countries={countriesData}
        onSelectCountry={(country) => handleSelectCountry(country, true)}
      />
      <div className="card-list">
        {cardList.map((card, index) => {
          if (card.type === "country") {
            return (
              <DetailedCountryInfo
                ref={(el) => (cardRefs.current[index] = el)}
                country={card.data.countryData}
                schools={card.data.schoolsData}
                onSelectSchool={handleSelectSchool}
                onSelectVariable={handleSelectVariable}
              />
            );
          } else if (card.type === "school") {
            return (
              <DetailedSchoolInfo
                ref={(el) => (cardRefs.current[index] = el)}
                school={card.data}
                onSelectPicture={handleSelectSchoolPicture}
                onSelectCountry={handleSelectCountry}
              />
            );
          } else if (card.type === "pictures") {
            return (
              <ComparePictures
                ref={(el) => (cardRefs.current[index] = el)}
                pictureType={card.data.pictureType}
                selectedSchool={card.data.selectedSchool}
                otherSchools={card.data.otherSchools}
                onSelectSchool={handleSelectSchool}
              />
            );
          } else if (card.type === "variable") {
            return (
              <CompareData
                ref={(el) => (cardRefs.current[index] = el)}
                countries={countriesData}
                variable={card.data}
                onSelectCountry={handleSelectCountry}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;

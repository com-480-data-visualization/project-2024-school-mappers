import Header from "./components/Header";
import Description from "./components/Description";
import CountryCards from "./components/CountryCards";
import DetailedCountryInfo from "./components/DetailedCountryInfo";
import DetailedSchoolInfo from "./components/DetailedSchoolInfo";
import SchoolPicture from "./components/SchoolPicture";
import CompareData from "./components/CompareData";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [cardList, setCardList] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/countries.json`)
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
        console.log("Fetching the data worked");
      })
      .catch((error) => console.error("Error fetching the JSON file:", error));
  }, []);

  useEffect(() => {
    if (cardList.length > 0) {
      cardRefs.current[cardList.length - 1].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [cardList]);

  const handleSelectCountry = (countryName, clearList = false) => {
    const countryData = countriesData.find((c) => c.name === countryName);

    if (countryData) {
      if (clearList) {
        setCardList([{ type: "country", data: countryData }]);
      } else {
        setCardList((previousCards) => [
          ...previousCards,
          { type: "country", data: countryData },
        ]);
      }
    }
  };

  const handleSelectSchool = (school) => {
    setCardList((previousCards) => [
      ...previousCards,
      {
        type: "school",
        data: school,
      },
    ]);
  };

  const handleSelectSchoolPicture = (pictureType) => {
    setCardList((previousCards) => [
      ...previousCards,
      {
        type: "schoolPicture",
        data: pictureType,
      },
    ]);
  };

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
      <Description />
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
                country={card.data}
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
          } else if (card.type === "schoolPicture") {
            return (
              <SchoolPicture
                ref={(el) => (cardRefs.current[index] = el)}
                pictureType={card.data}
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

/**
import Header from "./components/Header";
import Description from "./components/Description";
import CountryCards from "./components/CountryCards";
import DetailedCountryInfo from "./components/DetailedCountryInfo";
import DetailedSchoolInfo from "./components/DetailedSchoolInfo";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [cardList, setCardList] = useState([]);


  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
        console.log("Fetching the data worked");
      })
      .catch((error) => console.error("Error fetching the JSON file:", error));
  }, []);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSelectedSchool(null);
  };
  const handleSelectSchool = (school) => {
    setSelectedSchool(school);
  };

  return (
    <div className="App">
      <Header />
      <Description />
      <CountryCards
        countries={countriesData}
        onSelectCountry={handleSelectCountry}
      />
      {selectedCountry && (
        <DetailedCountryInfo
          country={countriesData.find(
            (country) => country.name === selectedCountry
          )}
          onSelectSchool={handleSelectSchool}
        />
      )}
      {selectedSchool && <DetailedSchoolInfo school={selectedSchool} />}
    </div>
  );
}

export default App;
*/
import Header from "./components/Header";
import Description from "./components/Description";
import CountryCards from "./components/CountryCards";
import DetailedCountryInfo from "./components/DetailedCountryInfo";
import DetailedSchoolInfo from "./components/DetailedSchoolInfo";
import SchoolPicture from "./components/SchoolPicture";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [cardList, setCardList] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    fetch("/data.json")
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

  const handleSelectCountry = (country, clearList = false) => {
    const countryData = countriesData.find((c) => c.name === country);
    if (countryData) {
      if (clearList) {
        setCardList([{ type: "country", data: countryData, country }]);
      } else {
        setCardList((previousCards) => [
          ...previousCards,
          { type: "country", data: countryData, country },
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

  return (
    <div className="App">
      <Header />
      <Description />
      <CountryCards
        countries={countriesData}
        onSelectCountry={handleSelectCountry}
      />
      <div className="card-list">
        {cardList.map((card, index) => {
          if (card.type === "country") {
            return (
              <DetailedCountryInfo
                ref={(el) => (cardRefs.current[index] = el)}
                country={card.data}
                onSelectSchool={handleSelectSchool}
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
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;

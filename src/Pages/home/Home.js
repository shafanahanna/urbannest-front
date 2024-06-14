import React, { useState, useEffect } from "react";
import place from "../../components/assets/all_cities";
import { Link, useNavigate } from "react-router-dom";
import Contact from "../../components/contact/contact";
import Aos from "aos";
import "aos/dist/aos.css";
import Popular from "../../components/popularareas";
import About from "../about.js";

function Home() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const [inputValue, setInputvalue] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setInputvalue(value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "" && selectedType !== "") {
      navigate(
        `/search?place=${encodeURIComponent(
          inputValue
        )}&category=${encodeURIComponent(selectedType)}`
      );
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (inputValue === "") {
      setSuggestions([]);
      return;
    }
    const filteredCities = place.filter((city) =>
      city.city.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredCities.slice(0, 5));
  }, [inputValue]);

  return (
    <>
      <div className="relative w-full h-[70vh] bg-home-back bg-cover bg-center flex flex-col justify-center items-center text-white">
        <div className="text-center p-8 bg-black bg-opacity-50 rounded-lg">
          <h1
            data-aos="zoom-in"
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            Find your next <span className="text-gray-300">perfect</span> place
            with ease
          </h1>
          <p data-aos="zoom-in" className="text-base sm:text-lg">
            UrbanNest is the best place to find your next perfect place to live.
            We have a wide range of properties for you to choose from.
          </p>
          <Link
            to="/"
            className="text-lg text-blue-300 font-bold hover:underline no-underline mt-4 inline-block"
          >
            Let's Start now...
          </Link>
        </div>
      </div>

      <div className="relative w-full flex justify-center -mt-16">
        <div className="bg-gray-900 bg-opacity-75 w-full max-w-4xl p-6 rounded-xl shadow-lg">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
            <div className="flex flex-col">
              <h2 className="text-white mb-2">LOCATION</h2>
              <input
                type="text"
                placeholder="Enter Location"
                value={inputValue}
                onChange={handleChange}
                onKeyPress={handleEnter}
                className="location_input h-10 rounded-lg p-2 bg-gray-700 text-white border border-gray-600"
                list="city-suggestions"
              />
              <datalist id="city-suggestions">
                {suggestions.map((city) => (
                  <option key={city.id} value={`${city.city}, ${city.state}`} />
                ))}
              </datalist>
            </div>
            <div className="flex flex-col">
              <h2 className="text-white mb-2">TYPE</h2>
              <select
                name="selectOption"
                id="selectOption"
                className="bg-gray-700 text-white p-2 border-b-2 border-gray-600 rounded-lg"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value="" disabled>
                  Select Property
                </option>
                <option value="Flats">Flats</option>
                <option value="Homes">Homes</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-lg p-2 w-full mt-5 text-white font-semibold rounded-lg transform hover:scale-105 transition-transform duration-300"
                onClick={handleSearch}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>

      <Popular />
      <About />
      <Contact />
    </>
  );
}

export default Home;

import React, { useEffect } from "react";
import homeback from "../../components/assets/homeback.png";
import Aos from "aos";
import "aos/dist/aos.css";
import About from "../about";

function Test() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  return (
    <>
      <div>
        <section
          id="hero"
          className="w-[95%] h-[600px] m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-center lg:px-28 px-10 gap-7 z-20 "
          style={{ backgroundImage: `url(${homeback})` }}
        >
          <h1
            data-aos="zoom-in"
            className="text-6xl text white font-semibold lg:pr-[500px]npr-0 lg:leading-70px leading-60px"
          >
            Find your next perfect home with ease
          </h1>
          <p data-aos="zoom-in" className="text-white text-xl lg:pr-500px pr-0">
            UrbanNest is the best place to find your next perfect place to live.{" "}
            <br />
            We have a wide range of properties for you to choose from.
          </p>
        </section>
      </div>

      <div>
        <div
          data-aos="zoom-in"
          id="form"
          className="bg-dark lg:w-70% w-full m-auto grid lg:grid-cols-4 grid-cols-1 justify-center items-center gap-6 rounded-xl -mt-14"
        >
          <div className="w-full">
            <h1 className="text-black font-semibold">LOCATION</h1>
            <input
              type="text"
              placeholder="Enter address,city or place"
              className="bg-white p-2 w-full mt-2 border-b-1px border-[#c9c7c1]"
            />
          </div>

          <div className="w-full">
            <h1 className="text-black font-semibold">TYPE</h1>
            <select
              name="selectOption"
              id="selectOption"
              className="bg-white p-2 border-b-2 w-full mt-2 border-[#c9c7c1] text-gray-500 text-md rounded-lg"
              //   value={selectedType}
              //   onChange={handleTypeChange}
            >
              <option value="" disabled>
                Select Property
              </option>
              <option value="Flats">Flats</option>
              <option value="Homes">Homes</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div className="w-full mt-4 lg:mt-0">
            <button
              className="bg-slate-600 hover:bg-black text-lg p-2 mt-4 w-full text-white font-semibold rounded-xl cursor-pointer transform hover:scale-110 transition-transform duration-300"
              //   onClick={handleSearch}
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
      <About />
    </>
  );
}

export default Test;

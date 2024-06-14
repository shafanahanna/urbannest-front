import React, { useEffect } from "react";
import area1 from "../components/assets/feat.avif";
import area2 from "../components/assets/feat3.avif";
import area3 from "../components/assets/feat2.avif";
import Aos from "aos";
import "aos/dist/aos.css";

function Popular() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  return (
    <div className="w-full px-4 py-16 mx-auto max-w-7xl">
      <section className="w-full h-fit bg-transparent rounded-xl flex flex-col items-center gap-20">
        <div
          id="top"
          className="w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8"
        >
          <div className="col-span-1">
            <h1 data-aos="zoom-in" className="text-red-500 uppercase">
              Popular areas
            </h1>
            <h1
              data-aos="zoom-in"
              className="text-black text-4xl font-semibold leading-10 mt-4"
            >
              Explore most <br /> popular areas
            </h1>
          </div>
          <div className="col-span-2 grid lg:grid-cols-3 grid-cols-1 gap-6">
            <div
              data-aos="zoom-in"
              data-aos-delay="400"
              style={{ backgroundImage: `url(${area1})` }}
              className="h-80 bg-cover bg-center rounded-xl"
            ></div>
            <div
              data-aos="zoom-in"
              data-aos-delay="400"
              style={{ backgroundImage: `url(${area2})` }}
              className="h-80 bg-cover bg-center rounded-xl"
            ></div>
            <div
              data-aos="zoom-in"
              data-aos-delay="400"
              style={{ backgroundImage: `url(${area3})` }}
              className="h-80 bg-cover bg-center rounded-xl"
            ></div>
          </div>
        </div>
        <div
          id="bottom"
          className="w-full grid lg:grid-cols-3 grid-cols-1 gap-6"
        >
          <div
            data-aos="slide-up"
            data-aos-delay="100"
            className="flex flex-col items-center gap-4 w-full"
          >
            <h1 className="text-black text-7xl font-semibold">5K</h1>
            <h1 className="text-center text-2xl">
              ACTIVE
              <br />
              LISTINGS
            </h1>
          </div>
          <div
            data-aos="slide-up"
            data-aos-delay="100"
            className="flex flex-col items-center gap-4 w-full"
          >
            <h1 className="text-black text-7xl font-semibold">3K</h1>
            <h1 className="text-center text-2xl">
              SOLD
              <br />
              PROPERTIES
            </h1>
          </div>
          <div
            data-aos="slide-up"
            data-aos-delay="100"
            className="flex flex-col items-center gap-4 w-full"
          >
            <h1 className="text-black text-7xl font-semibold">1K</h1>
            <h1 className="text-center text-2xl">
              NEW
              <br />
              PROPERTIES
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Popular;

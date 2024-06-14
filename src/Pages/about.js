import React, { useEffect } from "react";
import aboutimg from "../components/assets/about-img.jpeg";
import Aos from "aos";
import "aos/dist/aos.css";
function About() {
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
    <section
      id="about"
      className="light bg-transparent w-full m-auto lg:px-10 px-10 py-20 grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-10"
    >
      <div>
        <img
          data-aos="zoom-in"
          src={aboutimg}
          alt="about-img"
          className="rounded-2xl lg:w-500px lg:h-600px"
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-8">
        <h1 data-aos="zoom-in" className="text-red-500">
          WHO WE ARE
        </h1>
        <h1
          data-aos="zoom-in"
          data-aos-delay="200"
          className="text-black text-20px  leading-10 "
        >
          Why Choose URBANNEST
        </h1>
        <p
          data-aos="zoom-in"
          data-aos-delay="400"
          className="text-xl text-gray-600"
        >
          Welcome to UrbanNest, where we redefine the concept of premium living
          at an affordable price point. UrbanNest, synonymous with elegance and
          tranquility, offers a range of luxurious residences crafted with
          top-quality materials, fixtures, and fittings. Positioned ideally for
          a global audience, UrbanNest provides easy access to various amenities
          such as indoor and outdoor children's play areas, an amphitheater,
          clubhouse, gym, and more, ensuring a self-sufficient lifestyle for its
          residents. Owning a villa at UrbanNest ensures not just a home but a
          legacy for generations to come.
        </p>
        <button className="bg-red-600 hover:bg-black  text-lg p-4  text-white uppercase font-semibold rounded-xl cursor-pointer transform hover:scale-110 transition-transform duration-300">
          Read more
        </button>
      </div>
      
    </section>
    </>
  );
}

export default About;

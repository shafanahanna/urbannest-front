import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMobile,
  FaFax,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Aos from "aos";
import "aos/dist/aos.css";
import pic1 from "../assets/footimg.avif";
import pic2 from "../assets/footimg2.avif";

function Footer() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <footer className="bg-gray-900 w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
            className="flex flex-col gap-5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h1 className="text-white text-2xl font-semibold">About Us</h1>
            <p className="text-slate-200 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div
              id="social-icons"
              className="flex justify-start items-center gap-4 mt-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="p-3 rounded-full bg-white text-gray-900 hover:text-blue-800 cursor-pointer transform hover:scale-110 transition-transform duration-300">
                <FaFacebookF className="text-lg" />
              </div>
              <div className="p-3 rounded-full bg-white text-gray-900 hover:text-purple-700 cursor-pointer transform hover:scale-110 transition-transform duration-300">
                <FaInstagram className="text-lg" />
              </div>
              <div className="p-3 rounded-full bg-white text-gray-900 hover:text-blue-500 cursor-pointer transform hover:scale-110 transition-transform duration-300">
                <FaTwitter className="text-lg" />
              </div>
              <div className="p-3 rounded-full bg-white text-gray-900 hover:text-red-600 cursor-pointer transform hover:scale-110 transition-transform duration-300">
                <FaYoutube className="text-lg" />
              </div>
            </div>
            <h1 className="text-white mt-8 text-sm">
              © Copyright Urbannest, All Rights Reserved
            </h1>
          </div>

          <div
            className="flex flex-col gap-5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h1 className="text-white text-2xl font-semibold">Contact Us</h1>

            <div className="flex items-center gap-3">
              <FaMobile className="text-lg text-white" />
              <p className="text-slate-200">+91 24 564 524</p>
            </div>
            <div className="flex items-center gap-3">
              <FaFax className="text-lg text-white" />
              <p className="text-slate-200">93558 58656</p>
            </div>
            <div className="flex items-center gap-3">
              <IoMdMail className="text-lg text-white" />
              <p className="text-slate-200">urbannest@gmail.com</p>
            </div>
          </div>

          <div
            className="flex flex-col gap-5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h1 className="text-white text-2xl font-semibold">
              Latest Properties
            </h1>
            <div className="flex items-center gap-4">
              <img
                src={pic1}
                alt="Latest Property 1"
                className="w-28 h-28 rounded-lg object-cover transform hover:scale-110 cursor-pointer transition-transform duration-300"
              />
              <div>
                <h1 className="text-lg text-white">Villa with Amazing View</h1>
                <p className="text-slate-400">$245.36</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={pic2}
                alt="Latest Property 2"
                className="w-28 h-28 rounded-lg object-cover transform hover:scale-110 cursor-pointer transition-transform duration-300"
              />
              <div>
                <h1 className="text-lg text-white">Smart View from Beach</h1>
                <p className="text-slate-400">$445.86</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

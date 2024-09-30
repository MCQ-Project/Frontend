import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer bg-blue-500 dark:bg-[rgba(82,15,204,0.8)] tracking-widest xl:mt-12 w-full shadow-lg">
      <div className="footer-main w-full xl:m-auto mb-2 p-6 xl:flex xl:justify-between rounded-lg">
        
        {/* Column 1 */}
        <div className="footer-col w-full xl:w-1/4 mb-4 xl:mb-0 space-y-4">
          <h3 className="text-xl uppercase p-1 border-b-2 border-[rgba(82,15,204,1)]" style={{ color: "white", fontWeight: "bolder" }}>
            MERN-Quiz-App
          </h3>
          <p className="text-white text-xs xl:text-sm">
            WHERE PASSION MEETS PERFECTION!
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-col w-full xl:w-1/4 mb-4 xl:mb-0 space-y-4">
          <h3 className="text-xl uppercase p-1 border-b-2 border-[rgba(82,15,204,1)]" style={{ color: "white", fontWeight: "bolder" }}>
            Quiz
          </h3>
          <Link to="/" className="text-white text-xs xl:text-sm hover:underline">
            All Quiz
          </Link>
        </div>

        {/* Column 3 */}
        <div className="footer-col w-full xl:w-1/4 mb-4 xl:mb-0 space-y-4">
          <h3 className="text-xl uppercase p-1 border-b-2 border-[rgba(82,15,204,1)]" style={{ color: "white", fontWeight: "bolder" }}>
            Follow
          </h3>
          <div className="flex flex-col space-y-2">
            <a href="https://www.instagram.com/khemraj.bhatt.333?igsh=dm5uOGNlejZhdW96" className="flex items-center text-white text-xs xl:text-sm hover:underline" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-instagram mr-2"></i>
              Instagram
            </a>
            <a href="https://www.linkedin.com/me?trk=p_mwlite_profile_self-secondary_nav" className="flex items-center text-white text-xs xl:text-sm hover:underline" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-linkedin mr-2"></i>
              LinkedIn
            </a>
            <a href="https://www.facebook.com/khemraj.bhatt.333?mibextid=ZbWKwL" className="flex items-center text-white text-xs xl:text-sm hover:underline" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-facebook mr-2"></i>
              Facebook
            </a>
          </div>
        </div>

        {/* Column 4 */}
        <div className="footer-col w-full xl:w-1/4 space-y-4">
          <h3 className="text-xl uppercase p-1 border-b-2 border-[rgba(82,15,204,1)]" style={{ color: "white", fontWeight: "bolder" }}>
            Contact
          </h3>
          <p className="flex items-center text-white text-xs xl:text-sm">
            <i className="fa fa-home mr-2"></i>
            Mahendranagar, Kanchanpur
          </p>
          <p className="flex items-center text-white text-xs xl:text-sm">
            <i className="fa fa-envelope mr-2"></i>
            khembhatt369@gmail.com
          </p>
          <p className="flex items-center text-white text-xs xl:text-sm">
            <i className="fa fa-phone mr-2"></i>
            +977 9869905888
          </p>
        </div>
      </div>

      <p className="text-white text-center mt-4 pb-4 text-xs xl:text-sm">
        MERN Quiz App Designed and Developed By Team Learners.
      </p>
    </div>
  );
};

export default Footer;

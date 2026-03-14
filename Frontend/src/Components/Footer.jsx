import React from 'react'
import { IoLogoInstagram } from "react-icons/io";
import { SlSocialTwitter, SlSocialFacebook, SlSocialLinkedin } from "react-icons/sl";

const Footer = () => {

  return (

    <footer className="w-full bg-white border-t border-gray-200 py-2 md:py-0">
      
      <div className="max-w-[1275px] mx-auto px-4 md:h-[90px] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">

        <div className="flex flex-col items-center md:items-start order-2 md:order-1">
          <p className="text-gray-600 text-sm font-medium">
            © 2026 Atithi Inc. All rights reserved.
          </p>
          <div className="flex gap-4 mt-1">
            <span className="text-gray-500 text-xs cursor-pointer hover:text-red-500 transition-colors">Privacy policy</span>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-gray-500 text-xs cursor-pointer hover:text-red-500 transition-colors">Terms of service</span>
          </div>
        </div>

        <div className="flex items-center justify-center order-1 md:order-2">
          <img src="./Airbnb-Logo.png" alt="Logo" className="h-10 md:h-14 w-auto object-contain" />
        </div>

        <div className="flex items-center justify-center md:justify-end order-3">
          <div className="flex flex-row gap-5 text-[24px] md:text-[28px] text-gray-700">
            <IoLogoInstagram className="cursor-pointer hover:text-red-500 transition-all hover:scale-110" />
            <SlSocialTwitter className="cursor-pointer hover:text-red-500 transition-all hover:scale-110" />
            <SlSocialFacebook className="cursor-pointer hover:text-red-500 transition-all hover:scale-110" />
            <SlSocialLinkedin className="cursor-pointer hover:text-red-500 transition-all hover:scale-110" />
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
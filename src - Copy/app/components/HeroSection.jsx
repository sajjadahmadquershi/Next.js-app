"use client";
import React from "react";
import Image from "next/image";
import Whatsapp from "../../../public/whatsapp.svg";
import fiver from "../../../public/fiverr-1.svg";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
       <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;make{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "2d design",
                1000,
                "3d design",
                1000,
                "3d rendering",
                1000,
                ".fbx, .stl, .dxf etc",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Transforming imagination into reality, one pixel at a time. Let s sculpt your dreams into 3D-printed wonders!.
          </p>
        <div className="flex flex-col sm:flex-row justify-around items-end">
  <Link
    href="https://wa.me/message/FYPCUDSRLRNFG1"
    className="px-8 flex justify-around py-3 rounded-full mb-4 sm:mb-0 w-full sm:w-auto bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
  >
    Hire me on Whatsapp&nbsp; <Image className="w-6" src={Whatsapp} alt="Whatsapp Icon" />
  </Link>
  <Link
    href="https://www.fiverr.com/s/K2BYm2"
    className="px-8 flex justify-around py-3 rounded-full w-full sm:w-auto bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white"
  >
    Hire me on Fiverr&nbsp; <Image className="w-6" src={fiver} alt="Fiverr Icon" />
  </Link>
</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/hero-image.png"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

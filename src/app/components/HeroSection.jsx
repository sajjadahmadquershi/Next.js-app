"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import Whatsapp from "../../../public/whatsapp.svg";
import fiver from "../../../public/fiverr-1.svg";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import "@/styile/adminportfolio.css";
import '@/app/globals.css';
import { supabase } from "@/lib/supabaseClient";


const HeroSection = () => {
  const [siteContent, setSiteContent] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) {

      } else {
        setSiteContent(data);
      }

    };

    fetchData();
  }, []);
  const pathname = usePathname();
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          {pathname.includes("web") ? (
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
                Hello, I&apos;m into{" "}
              </span>
              <br />
              <TypeAnimation

                sequence={[
                  "Web Developer",
                  1000,
                  "React / Next.js",
                  1000,
                  "Firebase",
                  1000,
                  "Supabase",
                  1000,
                  "Laravel",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
          ) : (
            <h1 className="text-white mb-4 text-4xl sm:text-4xl lg:text-7xl lg:leading-normal font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
                Hello, I&apos;m a{" "}
              </span>
              <br />
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
          )}

          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl max-w-full sm:max-w-[90%] md:max-w-[80%]">
  {pathname.includes("web")
    ? "Crafting digital experiences that connect, engage, and inspire. From clean code to captivating design — let’s build your online presence together!"
    : "Bringing imagination to life — one pixel, one layer at a time. Let’s turn your ideas into stunning 2D visuals and 3D-printed masterpieces!"
  }
</p>
          <div className="flex flex-col sm:flex-row justify-around items-end sm:text-0.5">
            <Link
              href="https://wa.me/message/FYPCUDSRLRNFG1"
              className="px-8 flex justify-around py-3 rounded-full mb-4 sm:mb-0 w-full sm:w-auto bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Hire me on Whatsapp&nbsp; <Image className="w-6 heartbeat" src={Whatsapp} alt="Whatsapp Icon" />
            </Link>
            <Link
              href="https://www.fiverr.com/s/K2BYm2"
              className="px-8 flex justify-around py-3 rounded-full w-full sm:w-auto bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white"
            >
              Hire me on Fiverr&nbsp; <Image className="w-6 heartbeat" src={fiver} alt="Fiverr Icon" />
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="hero rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative overflow-hidden shake-horizontal">
            <img
              src={siteContent[0]?.main_image_url || "/images/hero-image.png"}
              alt="hero image"
              className="rounded-full object-cover w-full h-full cursor-pointer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

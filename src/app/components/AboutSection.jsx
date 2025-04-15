"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { usePathname } from 'next/navigation';
import { supabase } from "@/lib/supabaseClient";





const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>SolidWorks</li>
        <li>Revit</li>
        <li>Aspire</li>
        <li>Lumion</li>
        <li>Sketch Up</li>
        <li>Adobe</li>
        <li>AutoCAD</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Bs Computer science</li>

      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>CERTIFICATE IN 2D & 3D ANIMATION</li>
        <li>Adobe Certified Expert (ACE)</li>
      </ul>
    ),
  },
];
const TAB_DATA2 = [
  {
    title: "skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>HTML / CSS / JS</li>
        <li>React</li>
        <li>Next.js</li>
        <li>Tailwind CSS</li>
        <li>Firebase</li>
        <li>Supabase</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>MongoDB</li>
        <li>MySQL</li>
        <li>Laravel</li>
        <li>REST API</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Bs Computer science</li>

      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>Web and Mobile App</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const [siteContent, setSiteContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  const pathname = usePathname();






  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) {
     
      } else {
        setSiteContent(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);



  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        {/* <Image src="/images/about-image.png" width={500} height={500} /> */}
        {/* <video src="" width={500} height={500} /> */}
        <div className="relative" style={{ maxWidth: '100%' }}>
          <video
            className="w-full rounded-xl"
            width="500"
            height="315"
            src={ pathname.includes("web")?siteContent[0]?.["about-us-video-web"]:siteContent[0]?.["about-us-video-2d"]}
            controls
            autoPlay={false}
            muted
            loop
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
          <p className="text-base lg:text-lg">
            {
              pathname.includes("web")
                ? `We specialize in modern web development, combining clean code with user-focused design to create fast, responsive, and visually engaging websites. With hands-on expertise in React, Next.js, Laravel, and modern CSS frameworks like Tailwind, we build everything from sleek portfolios to dynamic web apps. Whether it's integrating databases like Firebase or Supabase, crafting RESTful APIs, or developing full-stack solutions — we bring ideas to life on the web. Let’s build digital experiences that leave a lasting impression.`
                : `We provide both 2D and 3D design services along with laser cutting-ready DXF files. Our work includes mechanical parts, architectural layouts, and detailed models using tools like SolidWorks, Revit, and Lumion. We also prepare files for CNC and laser cutting with precision and accuracy. Whether it's for printing, modeling, or production — we help turn your ideas into reliable and usable formats.`
            }
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              We Use {" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {
              pathname.includes("web")
                ? TAB_DATA2.find((t) => t.id === tab)?.content
                : TAB_DATA.find((t) => t.id === tab)?.content
            }
          </div>
        </div>
      </div>
    </section>

  );
};

export default AboutSection;

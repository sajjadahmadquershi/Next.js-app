"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

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

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
   <section className="text-white" id="about">
  <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
    {/* <Image src="/images/about-image.png" width={500} height={500} /> */}
    {/* <video src="" width={500} height={500} /> */}
    <div className="relative" style={{ maxWidth: '100%' }}>
      <iframe
        className="w-full"
        width="500"
        height="315"
        src="https://www.youtube.com/embed/X7XJX_hky80?si=e28byYpwpMlsjA4G"
        title="YouTube video player"
        frameBorder="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
    <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
      <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
      <p className="text-base lg:text-lg">
        I specialize in 3D design, blending creativity with technical precision to craft captivating visual experiences.
        With expertise in SolidWorks, Revit, and Lumion, I bring ideas to life, from intricate mechanical
        components to architectural wonders. My passion for innovation extends to 3D printing, where I
        leverage cutting-edge technology to turn concepts into tangible realities. Let s collaborate to turn your
        visions into stunning 3D-printed masterpieces.
      </p>
      <div className="flex flex-row justify-start mt-8">
        <TabButton
          selectTab={() => handleTabChange("skills")}
          active={tab === "skills"}
        >
          {" "}
          Skills{" "}
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
        {TAB_DATA.find((t) => t.id === tab).content}
      </div>
    </div>
  </div>
</section>
  );
};

export default AboutSection;

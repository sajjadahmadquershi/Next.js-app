"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Iron and wooden table in SolidWorks",
    // description: "Craft elegant and durable iron and wooden tables effortlessly in SolidWorks. From sleek contemporary designs to timeless classics, unleash your creativity and bring your vision to life with precise modeling and realistic rendering. Elevate any space with these versatile and stylish tables, meticulously crafted to meet your specifications and exceed your expectations.",
    image: "/images/projects/1.jpg",
    tag: ["All", "2D,3D"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Gaier set make in SolidWorks",
    // description: "Project 2 description",
    image: "/images/projects/2.png",
    tag: ["All", "2D,3D"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Soler plates structure",
    // description: "Project 3 description",
    image: "/images/projects/4.png",
    tag: ["All", "2D,3D"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Shop make in Sketch Up & Lumion",
    // description: "Project 4 description",
    image: "/images/projects/3.jpg",
    tag: ["All", "3D Render"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Make a sofa in SolidWorks",
    // description: "Authentication and CRUD operations",
    image: "/images/projects/5.png",
    tag: ["All", "2D,3D"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Whier house structure",
    // description: "Project 5 description",
    image: "/images/projects/6.jpg",
    tag: ["All", "2D,3D"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 7,
    title: "Make a pype voice in SolidWorks",
   
    image: "/images/projects/7.jpg",
    tag: ["All", "2D,3D"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="2D,3D"
          isSelected={tag === "2D,3D"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="3D Render"
          isSelected={tag === "3D Render"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;

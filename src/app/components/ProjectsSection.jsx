"use client";
import { useEffect, useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { usePathname } from 'next/navigation';
import { supabase } from "@/lib/supabaseClient";

const ProjectsSection = () => {
  const pathname = usePathname();
  const [projects, setProjects] = useState([]);
  const [tag, setTag] = useState("All");
  const [tags, setTags] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*');

      if (error) {
      } else {
        setProjects(data);

        const currentCategory = pathname.includes("web") ? "web" : "design";
        const filteredByCategory = data.filter(p =>
          currentCategory === "web" ? p.category === "web" : p.category !== "web"
        );

        const allTags = filteredByCategory.flatMap(p => p.tag);
const uniqueTags = [...new Set(allTags)];
setTags(["All", ...uniqueTags]); 
      }
    };

    fetchProjects();
  }, [pathname]);

  const filteredProjects = projects.filter((project) => {
    const inCategory = pathname.includes("web")
      ? project.category === "web"
      : project.category !== "web";
  
    const matchTag = tag === "All" || project.tag.includes(tag);
  
    return inCategory && matchTag;
  });

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8">
        My Projects
      </h2>

      {/* Tag Filters */}
      <div className="flex flex-row justify-center items-center gap-2 py-6 flex-wrap">
        {tags.map((t, index) => (
          <ProjectTag key={index} onClick={() => setTag(t)} name={t} isSelected={tag === t} />
        ))}
      </div>

      {/* Projects */}
      <ul ref={ref} className="grid md:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              image_url={project.image_url}
              gitUrl={project.gitUrl}  
              previewUrl={project.web_link} 
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;

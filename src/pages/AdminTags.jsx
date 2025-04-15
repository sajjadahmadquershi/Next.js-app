"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // ✅ Only this one should exist
import ProjectTag from "@/app/components/ProjectTag"; // ✅ Only this one should exist

const AdminTags = ({ onTagSelect }) => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            const { data, error } = await supabase
                .from("portfolio_items") // ✅ Make sure this is correct
                .select("tag");


            if (error) {
                console.error("Error fetching tags:", error);
                return;
            }
            const allTags = data.flatMap((item) => item.tag || []);
            const uniqueTags = [...new Set(allTags)];
            setTags(["All", ...uniqueTags]); // ✅ "All" کو add کر دیا
        };

        fetchTags();
    }, []);
    const handleClick = (tag) => {

        setSelectedTag(tag);
        onTagSelect(tag); // ✅ یہاں سے value AdminPortfolio میں جائے گی
    };

    return (
        <section className="p-4">
            <h2 className="text-2xl font-bold text-white mb-4">All Tags</h2>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <ProjectTag
                        key={index}
                        name={tag}
                        isSelected={selectedTag === tag}
                        onClick={() => handleClick(tag)}
                    />
                ))}
            </div>
        </section>
    );
};

export default AdminTags;

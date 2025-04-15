import { useEffect, useState, useRef } from "react";
import ProjectCard from "@/app/components/ProjectCard";
import { motion, useInView } from "framer-motion";
import "@/styile/adminportfolio.css";
import '@/app/globals.css';
import { supabase } from "@/lib/supabaseClient";
import AdminTags from "./AdminTags";
import Image from "next/image";




const AdminPortfolio = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tag: "All",
    customTag: "",
    web_link: "",
    file: null,
  });
  const [showModalform, setShowModalform] = useState(false);
  const [filePreview, setFilePreview] = useState(null); // For preview of uploaded file
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  // States at the top of your Admin component
  const [editMode, setEditMode] = useState(false);
  const [siteContent, setSiteContent] = useState([]);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };
  //animation
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // portfolio_items
      const { data: projectData, error: projectError } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectError) {
      } else {
        setProjects(projectData);
      }

      // site_content
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


  const filteredProjects =
    selectedTag && selectedTag !== "All"
      ? projects.filter((project) => project.tag.includes(selectedTag))
      : projects;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.tag === "All") {
      alert("The 'All' tag is not allowed. Please choose another tag.");
      setIsSubmitting(false);
      return;
    }
     

    const { title, category, tag, customTag, file, web_link } = formData;
    const finalTag = customTag ? customTag : tag;

    if (!title || !category) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    let publicURL = editingProject?.image_url || null;

    // اگر نئی فائل ہے تو پرانی delete کرو اور نئی upload کرو
    if (file) {
      // ✅ Delete old image if exists
      if (editingProject?.image_url) {
        const oldUrl = editingProject.image_url;
        const parts = oldUrl.split('/');
        const index = parts.findIndex(part => part === "portfolio-assets") + 1;
        const oldFilePath = parts.slice(index).join('/');

        const { error: deleteError } = await supabase
          .storage
          .from("portfolio-assets")
          .remove([oldFilePath]);

        if (deleteError) {
          alert("Error deleting old image: " + deleteError.message);
          setIsSubmitting(false);
          return;
        }
      }

      // ✅ Upload new file
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(filePath, file);

      if (uploadError) {
        alert("Error uploading file: " + uploadError.message);
        setIsSubmitting(false);
        return;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from("portfolio-assets")
        .getPublicUrl(filePath);

      publicURL = publicUrlData.publicUrl;
    }

    if (editingProject) {
      // 🟡 Edit Mode
      const { error: updateError } = await supabase
        .from("portfolio_items")
        .update({
          title,
          category,
          tag: [finalTag],
          web_link,
          image_url: publicURL,
        })
        .eq("id", editingProject.id);

      if (updateError) {
        alert("Error updating project: " + updateError.message);
      } else {
        alert("Project updated successfully!");
      }
    } else {
      // 🟢 Add New Project
      const { error: insertError } = await supabase
        .from("portfolio_items")
        .insert([
          {
            title,
            category,
            tag: [finalTag],
            web_link,
            image_url: publicURL,
          },
        ]);

      if (insertError) {
        alert("Error saving project: " + insertError.message);
      } else {
        alert("Project added successfully!");
      }
    }

    // Reset form
    setFormData({
      title: "",
      category: "",
      tag: "All",
      customTag: "",
      web_link: "",
      file: null,
    });
    setFilePreview(null);
    setEditingProject(null);
    setShowModalform(false);
    setIsSubmitting(false);
    setProjects((prev) =>
      editingProject
        ? prev.map((proj) =>
          proj.id === editingProject.id
            ? {
              ...proj,
              title,
              category,
              tag: [finalTag],
              web_link,
              image_url: publicURL,
            }
            : proj
        )
        : [...prev, { ...formData, tag: [finalTag], image_url: publicURL }]
    );
  };



  // File upload function
  const handleFileUpload = async (file, column) => {
    const need = window.confirm(`Are you sure you want to update the ${column} file?`);
    if (!need || !file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    const row = siteContent[0]; // موجودہ row
    const rowId = row?.id;

    if (!rowId) {
      alert("No row found in site_content.");
      return;
    }

    // اگر پرانی فائل موجود ہے، delete کریں
    const oldUrl = row?.[column];
    if (oldUrl) {
      const parts = oldUrl.split('/');
      const index = parts.findIndex(part => part === "portfolio-assets") + 1;
      const oldFilePath = parts.slice(index).join('/');

      const { error: deleteError } = await supabase
        .storage
        .from("portfolio-assets")
        .remove([oldFilePath]);

      if (deleteError) {
        alert("Error deleting old file: " + deleteError.message);
        return;
      }
    }

    // نئی فائل upload کریں
    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(filePath, file);

    if (uploadError) {
      alert("Error uploading new file: " + uploadError.message);
      return;
    }

    // نئی فائل کا URL حاصل کریں
    const { data: publicUrlData } = supabase
      .storage
      .from("portfolio-assets")
      .getPublicUrl(filePath);

    const publicURL = publicUrlData.publicUrl;

    // متعلقہ column کو update کریں
    const { error: updateError } = await supabase
      .from("site_content")
      .update({ [column]: publicURL })
      .eq('id', rowId);

    if (updateError) {
      alert(`Error updating ${column}: ` + updateError.message);
    } else {
      alert(`${column} updated successfully!`);
    }
  };



  // File upload function

  // File change handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });

    // Show file preview for images or videos
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFilePreview(fileURL);
    }
  };
  // Delete function
  const Delete = async (id) => {
    const need = window.confirm("Are you sure you want to delete?");
    if (need) {
      try {
        const { error } = await supabase
          .from('portfolio_items')
          .delete()
          .eq('id', id)
          .single();

        if (error) throw error;

        // ✅ لوکل state سے بھی ڈیٹا نکال دو
        setProjects(prev => prev.filter(project => project.id !== id));

        return 'Row deleted';

      } catch (error) {
        if (error.code === 'PGRST116') return 'Row not found';
        return 'Something went wrong';
      }
    }
  };
  // Close modal function  

  // Edit function
  const handleEdit = (project) => {
    setShowModalform(true);
    setEditMode(true);
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      category: project.category || "",
      tag: project.tag?.[0] || "", // ✅ array کا پہلا element لو
      customTag: project.customTag || "",
      web_link: project.web_link || "",
    });
  };

  // tag handling
  const designTags = [
    ...new Set(
      projects
        ?.filter((project) => project.category === "2d-3d")
        ?.map((project) => project.tag || []) // یہاں "tag" استعمال ہو رہا ہے
        ?.flat()
        ?.filter((tag) => tag)
    ),
  ];
  const webTags = [
    ...new Set(
      projects
        ?.filter((project) => project.category === "web")
        ?.map((project) => project.tag || [])
        ?.flat()
        ?.filter((tag) => tag)
    ),
  ];

  return (
    <div className="admin-portfolio dark-mode">
      <h2 className="title">Manage Portfolio</h2>
      <div className="buttons mb-4">
        <button onClick={() => setShowModalform(true)} className="edit-btn moody-a">
          +
        </button>
        <label htmlFor="fileUploadweb">
          <button className="edit-btn moody-a">Change Web Intro Video</button>
          <input
            type="file"
            id="fileUploadweb"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              handleFileUpload(file, "about-us-video-web");
            }}
          />
        </label>

        <label htmlFor="fileUpload2d">
          <button className="edit-btn moody-a">Change 2D, 3D Intro Video</button>
          <input
            type="file"
            id="fileUpload2d"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              handleFileUpload(file, "about-us-video-2d");
            }}
          />
        </label>

        <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative overflow-hidden shake-horizontal">
          <label htmlFor="fileUpload">
            <img
              src={siteContent[0]?.main_image_url || "/images/hero-image.png"}
              alt="hero image"
              className="rounded-full object-cover w-full h-full cursor-pointer"
            />
          </label>

          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              handleFileUpload(file, "main_image_url");
            }}
          />
        </div>

      </div>

      <div className="admin-portfolio dark-mode">
        <AdminTags onTagSelect={handleTagSelect} />

      </div>

      {showModalform && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-20 bg-white p-8 max-w-screen-md rounded-xl scale-up-hor-center">
              <button
                className="absolute top-0 right-0 cursor-pointer border-2 rounded-full p-2 text-gray-950"
                onClick={() => {
                  setShowModalform(false);
                  setFormData({
                    title: "",
                    category: "",
                    tag: "All",
                    customTag: "",
                    web_link: "",
                    file: null,
                  });
                }}
              >
                X
              </button>
              <form onSubmit={handleFormSubmit} className="admin-form dark-form">
                <input
                  type="text"
                  placeholder="Project Title"
                  className="input-field text-gray-950"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />

                {/* Category Selection */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Select Category<span className="text-red-500">*</span></label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        value="web"
                        checked={formData.category === "web"}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      />
                      Web
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        value="2d-3d"
                        checked={formData.category === "2d-3d"}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      />
                      2D / 3D
                    </label>
                  </div>
                </div>


                {/* Tag Selection */}
                {formData.category && (
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Select Tag</label>
                    <select
                      className="input-field text-gray-950"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    >
                      {formData.category === "web" && (
                        <>
                          {(formData.category === "web" ? webTags : designTags).map(
                            (tag, index) => (
                              <option key={index} value={tag}>
                                {tag}
                              </option>
                            )
                          )}
                        </>
                      )}
                      {formData.category === "2d-3d" && (
                        <>

                          {(formData.category === "2d-3d" ? designTags : webTags).map(
                            (tag, index) => (
                              <option key={index} value={tag}>
                                {tag}
                              </option>
                            )
                          )}
                        </>
                      )}
                    </select>
                  </div>
                )}

                {/* Custom Tag */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Or Add Custom Tag (optional)</label>
                  <input
                    type="text"
                    placeholder="Enter your custom tag"
                    className="input-field text-gray-950"
                    value={formData.customTag}
                    onChange={(e) => setFormData({ ...formData, customTag: e.target.value })}
                  />
                </div>
                {/* Custom Tag */}
                {formData.category === "web" && (
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Add web link</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your custom tag"
                      className="input-field text-gray-950"
                      value={formData.web_link}
                      onChange={(e) => setFormData({ ...formData, web_link: e.target.value })}
                    />
                  </div>
                )}

                {/* File Upload */}
                <input
                  type="file"
                  className="input-field"
                  onChange={handleFileChange}
                />

                {/* Show Preview */}
                {filePreview && (
                  <div className="file-preview mt-4">
                    <p className="text-sm font-semibold mb-2">Preview:</p>

                    <div className="media-frame">
                      {formData.file.type.startsWith("image/") ? (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="preview-media"
                        />
                      ) : formData.file.type.startsWith("video/") ? (
                        <video
                          src={filePreview}
                          controls
                          className="preview-media"
                        />
                      ) : (
                        <p>Preview not supported</p>
                      )}
                    </div>
                  </div>
                )}




                <button type="submit" className="submit-btnn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </div>
                  ) : (
                    editingProject ? "Update Project" : "Add Project"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.3, delay: index * 0.2 }}
            >
              <div className="card-content">
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  image_url={project.image_url}
                  gitUrl={project.gitUrl}  // اگر نہیں ہے تو اسے remove کر دو یا optional رکھو
                  previewUrl={project.web_link} // ✅ یہاں پر web_link pass کرو
                />
              </div>
              <div className="buttons">
                <button onClick={() => handleEdit(project)} className="edit-btn moody">
                  Edit
                </button>
                <button onClick={() => Delete(project.id)} className="edit-btn moody-d">
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPortfolio



import React, { useState } from "react";
import OnAI from "../images/logo.png";

const ProfilePicCreate = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreviewImage(fileURL);

      // Free memory when the image is loaded
      const img = new Image();
      img.src = fileURL;
      img.onload = () => {
        URL.revokeObjectURL(fileURL);
      };
    }
  };

  return (
    <form>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4 px-3">
        {/* Avatar */}
        <div className="shrink-0">
          <img
            id="preview_img"
            className="h-36 w-36 object-cover rounded-full border-2 border-blue-300 shadow-lg"
            src={previewImage}
            alt="."
          />
        </div>

        {/* Upload Button */}
        <label className="flex flex-col items-center">
          <input
            type="file"
            accept="image/"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-3xl transition hover:bg-blue-700"
            onClick={() => document.querySelector("input[type=file]").click()}
          >
            Upload Logo
          </button>
        </label>
      </div>
    </form>
  );
};

export default ProfilePicCreate;

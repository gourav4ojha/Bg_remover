import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [image, setImage] = useState();
  const [bgremove, setBgremove] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!image) return;

    const apikey = "RWLHGmgSGxeHdwrrXB73DpZD";
    const url = "https://api.remove.bg/v1.0/removebg";

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", image, image.name);

    fetch(url, {
      method: "POST",
      headers: {
        "X-Api-key": apikey,
      },
      body: formData,
    })
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setBgremove(result);
          navigate("/result", { state: { bgremove: result } }); // Passing bgremove as state
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => console.error(error));
  }, [image, navigate, bgremove]);

  const handleChange = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="mx-auto px-4 py-8 select-none md:mt-32">
      <div className="flex flex-col lg:flex-row items-center  p-4  border border-gray shadow-lg rounded-lg lg:items-start justify-center ">
        <div className="relative group flex flex-col max-w-md mt-8 md:mt-1  p-4 ">
          <div className="w-full flex flex-col sm:justify-center sm:items-center  sm:gap-8 sm:pt-8 sm:pb-16 ">
            <div className="p-4 text-center lg:text-4xl md:text-3xl sm:text-xl font-bold text-gray-600 whitespace-normal flex-wrap">
              Upload an image to <br />
              remove the background
            </div>
            <div>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              onClick={handleChange}
              type="button"
              className="border border-transparent mb-2 rounded-full font-bold transition ease-in-out text-center font-body no-underline hover:no-underline inline-flex items-center justify-center text-lg md:text-2xl px-6 md:px-8 py-2 md:py-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-700 active:scale-[0.98] focus:outline-none focus-visible:outline-none focus-visible:ring-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-blue-700"
            >
              Upload Image
            </button>

            <div className="hidden sm:flex flex-col gap-1.5">
              <p className="m-0 font-bold text-xl text-gray-500 text-typo-secondary">
                or drop a file,
              </p>
              <span className="text-xs text-typo-secondary text-center text-gray-500">
                paste image or{" "}
                <a
                  href="/"
                  className="text-typo-secondary select-photo-url-btn underline"
                >
                  URL
                </a>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

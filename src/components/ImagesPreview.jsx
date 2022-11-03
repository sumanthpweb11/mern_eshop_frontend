import React from "react";

const ImagesPreview = ({ url, heading }) => {
  return (
    <div>
      {url && (
        <div>
          <h1 className="my-2 text-base capitalize text-gray-400 ">
            {heading}
          </h1>
          <div className="preview-img">
            <img
              className="w-full h-full object-cover"
              src={url}
              alt="default-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesPreview;

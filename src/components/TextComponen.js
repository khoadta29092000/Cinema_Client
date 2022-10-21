import React, { useState } from "react";

const UploadAndDisplayImage = (props) => {
    const [selectedImage, setSelectedImage] = useState(props?.props?.avatar);
    const [click, SetClick] = useState(false)
    
    console.log(props)

    return (
        <div>

            {selectedImage && (
                <div>
                    <img alt="not fount" className="rounded-full w-72 h-72 "  src={ click == false ? selectedImage : window.URL.createObjectURL(selectedImage) }/>
                    <br />
                </div>
            )}
            <br />

            <br />
            <input
              className="w-96"
               defaultValue={ window.URL.createObjectURL(selectedImage)}
            />
            <input
                type="file" 
                onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                    SetClick(true);
                }}
            />
        </div>
    );
};

export default UploadAndDisplayImage;

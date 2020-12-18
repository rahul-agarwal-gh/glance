import React from "react"
import "./styles/ImageList.css";
const ImageList = ({images}) => {

    const renderedImages = images.map( (imgURL, index) => {
        return <img key={index} src={imgURL} />
    })
    
    return (
        <div className="image-list">{renderedImages}</div>
    )
}

export default ImageList
import React from "react"
import ImageCard from "./ImageCard"
import "./styles/ImageList.css";

const ImageList = ({images, imageTitles, imageDescs}) => {

    const renderedImages = images.map( (imgURL, index) => {
        return <ImageCard key={index} source={imgURL} title={imageTitles[index]} desc={imageDescs[index]}/>
    })
    
    return (
        <div className="image-list">{renderedImages}</div>
    )
}

export default ImageList


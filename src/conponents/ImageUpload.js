import React, {useEffect, useState} from "react"
import axios from "axios"
import "./ImageUpload.css"
  
const ImageUpload = () => {

    const [img, setImg] = useState(null) 
    const [imgURL, setImgURL] = useState('')

    const [uploadedImages, setUploadedImages] = useState([])

    const onImageUpload = (e) => {
        setImgURL(e.target.files[0])
        setImg(URL.createObjectURL(e.target.files[0]))
    }

    const onRemoveClick = (e) => {
        setImgURL('')
        setImg(URL.revokeObjectURL(img))

    }
    const onFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', imgURL)
        const config = {
            headers: {
                'Authorization': "Client-ID d9beedee590d93a"
            }
        }
        const res = await axios.post('https://api.imgur.com/3/image', formData, config)   
        console.log(res.data.data.link)
        if(res.data){
            setUploadedImages([...uploadedImages, res.data.data.link])
        }
    }

    return (
        <React.Fragment>
            <div className="div-main">
            <div className="title">Image Upload</div>
            <form onSubmit={e => onFormSubmit(e) }>
                <label for="img">Select image:</label>
                <input type="file" id="img" name="img" accept="image/*" onChange={ e => onImageUpload(e)}/>
                <input type="submit" value="Upload"></input>
            </form>
            <button onClick={onRemoveClick}>Remove Image</button>
            <img src={img} />
            </div>
        </ React.Fragment>
    )
}

export default ImageUpload


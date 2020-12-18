import React, {useEffect, useState} from "react"
import axios from "axios"
import "./styles/ImageUpload.css"
//Material UI Button
import { Grid, Container, Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload, Delete, DeleteSweepOutlined } from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  
const ImageUpload = () => {

    const classes = useStyles(); //for MUI

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
            <div className="title-div"><span  className="title">Image Upload</span></div>
            <form onSubmit={e => onFormSubmit(e) }>
                <h3>Select Image</h3>
                {/* <input type="file" id="img" name="img" accept="image/*" onChange={ e => onImageUpload(e)}/> */}
                <Input type="file" id="img" name="img" accept="image/*" onChange={ e => onImageUpload(e)} />
                {/* <input type="submit" value="Upload"></input> */}
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUpload />} 
                    type="submit"
                >Upload</Button>
            </form>
            {/* <button onClick={onRemoveClick}>Remove Image</button> */}
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<Delete />} 
                onClick={onRemoveClick}
            >Remove Image</Button>
            <img src={img} />
            </div>
        </ React.Fragment>
    )
}

export default ImageUpload


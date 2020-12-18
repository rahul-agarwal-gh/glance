import React, {useEffect, useState} from "react"
import axios from "axios"
import "./styles/ImageUpload.css"
//Material UI Button
import { Grid, Container, Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload, Delete, DeleteSweepOutlined } from '@material-ui/icons/';

import ImageList from "./ImageList"

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));



const ImageUpload = () => {
    const images = []

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
            //call code to show uploaded image to ikmage view grid
            /*

             */
            console.log(images)
        }
    }

    return (
        <React.Fragment>
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={3} className="img-upload-top-class">
                        <Container className="app-title-box">
                            <span className="app-title-text">Image Uploader</span>
                        </Container>
                        <Container>
                            <form onSubmit={e => onFormSubmit(e) }>
                                <h3 id="select-instruction">Select an Image to Upload </h3>
                                <Input type="file" id="img" name="img" accept="image/*" onChange={ e => onImageUpload(e)} className="img-upload-btn"/>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<CloudUpload />} 
                                    type="submit"
                                >Upload</Button>
                            </form>
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<Delete />} 
                                onClick={onRemoveClick}
                            >Remove Image</Button>
                            <img src={img} />
                        </Container>
                    </Grid>
                    <Grid item xs={9}  className="img-view-top-class">
                        <Container>
                            {/* {uploadedImages.length} */}
                            <ImageList images={uploadedImages} />
                        </Container>
                    </Grid>
                </Grid>        
            </div>
        </ React.Fragment>
    )
}

export default ImageUpload


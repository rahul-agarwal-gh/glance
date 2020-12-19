import React, {useState} from "react"
import axios from "axios"
import "./styles/ImageUpload.css"

//Material UI 
import { Grid, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload, Delete } from '@material-ui/icons/';
import CameraIcon from '@material-ui/icons/Camera';

//Semantic UI
import { Form, TextArea } from 'semantic-ui-react'

//Custom Components
import ImageList from "./ImageList"
import Spinner from "./Spinner"

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const ImageUpload = () => {
    
    const classes = useStyles(); //for MUI

    const [img, setImg] = useState('') //this state is used to store the preview <img> (file object)
    const [imgURL, setImgURL] = useState('') //URL.creatObjectURL() creates a temp local URL that is tied to the doc in which it is created 
    //This URL can be used to set the the src property of a preview <img/> element. This state stores the url that will go inside src
    
    const [imageTitle, setImageTitle] = useState('') //stores title of current image user has selected to upload
    const [imageDesc, setImageDesc] = useState('') //stores desc of current image user has selected to upload 

    const [uploadedImages, setUploadedImages] = useState([]) //this array will store all images user uploaded till now
    const [uploadedImagesTitle, setUploadedImagesTitle] = useState([]) //this array stores titles of all images uploaded till now
    const [uploadedImagesDesc, setUploadedImagesDesc] = useState([]) //this array stores descs of all images uploaded till now

    const [loading, setLoading] = useState(false) //if our image is getting loaded from imgur, then spinner will be shown, initially false

    const onImageTitleChange = (e) => {
        setImageTitle(e.target.value)
    }

    const onImageDescChange = (e) => {
        setImageDesc(e.target.value)
    }

    const onImageUpload = (e) => {      //called when user have choosen the image
        //e.target.files[0] will be a file object with details of uploaded file like name, lastModified etc. It does not contain any src
        setImgURL(URL.createObjectURL(e.target.files[0]))
        setImg(e.target.files[0])//img state will now contain a url of our selected image
    }

    const onRemoveClick = (e) => {
        if(img === '')
            return alert("No Image to Remove")
        setImgURL(URL.revokeObjectURL(img))
        setImg('')
        setImageTitle('')
        setImageDesc('')
    }
    const onFormSubmit = async (e) => {
        e.preventDefault()

        if(img === ''){
            return alert("No Image Selected to Upload")
        }

        setLoading(true)
        const formData = new FormData()
        formData.append('image', img)
        const config = {
            headers: {
                'Authorization': "Client-ID d9beedee590d93a"
            }
        }
        const res = await axios.post('https://api.imgur.com/3/image', formData, config)   
        if(res.data){
            setLoading(false)
            setImgURL(URL.revokeObjectURL(img))
            setImg('')
            setImageTitle('')
            setImageDesc('')
            setUploadedImages([...uploadedImages, res.data.data.link])
            setUploadedImagesTitle([...uploadedImagesTitle, imageTitle])
            setUploadedImagesDesc([...uploadedImagesDesc, imageDesc])
        }
    }

    return (
        <React.Fragment>
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={3} className="img-upload-top-class">
                        <Container className="app-title-box">
                        <br/>
                        <span className="app-title-text"><CameraIcon fontSize="large"/> glance</span>
                        <br />
                        </Container>
                        <Container>
                            <Form onSubmit={e => onFormSubmit(e) }>
                                <h2 id="select-instruction">Select an Image to Upload </h2>
                                <label for="file-upload" class="custom-file-upload">
                                <i class="fa fa-cloud-upload"></i> Choose Image
                                </label>
                                <input id="file-upload" type="file" accept="image/*" onChange={ e => onImageUpload(e)} />
                                <div class="ui input"><input type="text" id="imgTitle" value={imageTitle} placeholder="Title for the Image?" onChange={e => onImageTitleChange(e)} maxLength="20" required/></div>
                                <div class="ui input"><TextArea id="imgDesc" value={imageDesc} placeholder='Tell us more?' onChange={e => onImageDescChange(e)} maxlength="25" style={{ minHeight: 100 }} required/></div>
                                <Button
                                    variant="contained"
                                    color="default"
                                    style={{marginLeft: "0%"}}
                                    className={classes.button}
                                    startIcon={<CloudUpload />} 
                                    type="submit"
                                >Upload</Button>
                                <Button
                                    variant="contained"
                                    color="default"
                                    style={{marginLeft: "0%"}}
                                    className={classes.button}
                                    startIcon={<Delete />} 
                                    onClick={onRemoveClick}
                                >Remove Image</Button>
                            </Form>
                        </Container>
                        <Container>
                            {loading ? <div><br /> <Spinner /> <br /> </div>: null}
                            {img !== '' ? <div><span style={{color: "whitesmoke", fontFamily: "verdana"}}>Preview</span>
                                <div class="ui card">
                                    <div class="image">
                                        <img src={imgURL} alt='' />
                                    </div>
                                    <div class="content">
                                        <span class="header">{imageTitle}</span>
                                        <div class="description">{imageDesc}</div>
                                    </div>
                            </div> </div>: <div className="prvwFrame">A Preview of Your Choosen Image will be shown here</div>}
                        </Container>
                        </Grid>
                    <Grid item xs={9}  className="img-view-top-class">
                        <Container>
                            <br />
                            <br />
                            {uploadedImages.length === 0 ? <span className="your-img">Your Uploaded Images will be Shown here</span>:
                            <ImageList images={uploadedImages} imageTitles={uploadedImagesTitle} imageDescs={uploadedImagesDesc}/> }
                        </Container>
                    </Grid>
                </Grid>        
            </div>
        </ React.Fragment>
    )
}

export default ImageUpload


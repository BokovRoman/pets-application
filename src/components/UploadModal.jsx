import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import ReactDom from 'react-dom';
import UploadPic from '../images/upload.jpg';
import { useDropzone } from 'react-dropzone';
import Btn from './Button';

const UploadModal = ({ open, onClose }) => {
    const [files, setFiles] = useState([]);
    const [hidden, setHidden] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map( file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })),
            setHidden(true)
            )
        }
    })

    const images = files.map( file => (
        <div key={file.name}>
            <img src={file.preview} alt={file.name}  style={{ maxHeight: '280px', borderRadius: '10px', objectFit: 'contain' }} />
        </div>
    ))

    let message
    if (files.length === 0) {
        message = 'No item selected'
    } else {
        message = `Image File Name: ${files[0].name}`
    }

     const handleUpload = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data', 'x-api-key': '220e3104-105e-4131-96f6-194253068792' } };
        let fd = new FormData();

        files.map((file) => {
        fd.append("file",file);
        });

        axios.post('https://api.thecatapi.com/v1/images/upload', fd, config)
        .then((response) => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    if (!open) return null;

    return ReactDom.createPortal(
        <>
            <Overlay />
            <Section maxH100>
                <CloseBtn onClick={onClose}>
                    <svg viewBox="0 0 18 18">
                        <path d="M8.05691 8.99997L0.52832 1.47137L1.47113 0.528564L8.99972 8.05716L16.5283 0.528564L17.4711 1.47137L9.94253 8.99997L17.4711 16.5286L16.5283 17.4714L8.99972 9.94278L1.47113 17.4714L0.52832 16.5286L8.05691 8.99997Z"></path>
                    </svg>
                </CloseBtn>
                <h1>Upload a .jpg or .png Cat Image</h1>
                <p>Any uploads must comply with the <a href="https://www.thecatapi.com/privacy" target="_blank" rel="noreferrer" >upload guidelines</a> or face deletion.</p>
                <DropArea {...getRootProps()}>
                    <div>
                        <input {...getInputProps()} />
                        <p hidden={hidden}><span>Drag here</span> your file or <span>Click here</span> to upload</p>
                        {images}
                    </div>
                </DropArea>
                <p>{ message }</p>
                <Btn btnContent="Upload photo" hidden={!hidden} onClick={handleUpload} />
            </Section>
        </>,
        document.getElementById('portal')
    )
}

export default UploadModal;


const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(29, 29, 29, 0.6);
    z-index: 1000;
`
const Section = styled.section`
    position: fixed;
    left: 50%;
    top: 0%;
    background: ${ props => props.theme.bgPopup}; 
    z-index: 1000;
    border-radius: 20px;
    width: 46%;
    padding: 1.8rem;
    margin: 20px 30px;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        color: ${ props => props.theme.textPrim};
    }
    p {
        font-size: 18px;
        line-height: 3;
        color: ${ props => props.theme.textSec};
        display:  ${ props => props.hidden && 'none'};
    }
    a {
        color: #FF868E;
    }
`

const DropArea = styled.div`
    background-color: ${ props => props.theme.bgDroparea};  
    margin: 0px 20px; 
    min-height: 320px;
    width: 100%;
    border-radius: 20px;
    border: 2px dashed #FBE0DC;
    margin: 30px 0px 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
        background: url(${UploadPic}) no-repeat center;
        height: 200px;
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    p {
        font-size: 20px;
        color: ${ props => props.theme.textSec};
    }
    span {
        color: ${ props => props.theme.textPrim};
    }
`

const CloseBtn = styled.button`
    position: absolute;
    top: 1.8rem;
    right: 1.8rem;
    background: ${props => props.theme.bgBox};
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    svg {
        width: 17px;
        height: 17px;
        fill: #FF868E;
    }
    &:hover {
        background: #FF868E;
    }
    &:hover svg{
        fill: #FFFFFF;
    }
` 
import React, { useState, useMemo } from 'react'
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'
import styles from '../styles/post.module.css'

const post = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [caption, setCaption] = useState("")
  const [message, setMessage] = useState("")

  console.log(acceptedFiles)
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  

  async function send() {
    let file = acceptedFiles[0];
    console.log(file)
    const storageRef = ref(storage, 'files/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            setMessage("Uploading...")
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          sendItUp(downloadURL)
          setCaption("")
          setMessage("Many thanks from your seniors! send another!")
          setTimeout(function () {
            setMessage("")
          }, 2000);
          acceptedFiles.length = 0
          acceptedFiles.splice(0, acceptedFiles.length)
        });

      }
    );
    console.log(acceptedFiles[0]);
    console.log(caption)
  }
  async function sendItUp(downloadURL) {
    const res2 = await fetch('/api/createPost', {
      method: 'POST',
      body: JSON.stringify({ file: downloadURL, name: localStorage.getItem("name"), familyCode: localStorage.getItem("familyCode"), caption: caption, }),
      headers: {
        'Content-Type': 'application/json',
      }
    })




  }
  return (
    <div className = {styles.contain}>
        <div className={styles.squiggle}><img src='/squig.svg' width='250' height='100' /></div>
        <h1 className={styles.postHeader}>New Post!</h1>
        <br></br>        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

    <div  className = {styles.big}>
      <h3>Upload a photo from your day to make your seniors' day!</h3>
      <br></br>
      <br></br>

      <div  {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <h3>{files}</h3>
      <br></br>

      <h2>Write a Caption! ✍️</h2>
      <br></br>

      <textarea className = {styles.textarea} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="your delightful caption..."></textarea>
      <br></br>
      <button onClick={send}>🕊 Send!</button>
      <br></br>

      <h3>{message}</h3>
      </div> 
    </div>
  )
}

export default post
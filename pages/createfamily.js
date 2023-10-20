import {useState} from 'react'
import SetupAccount from '../components/SetupAccount'
    
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase'
const createfamily = () => 
{

  async function create(deets){
    console.log(deets)

    if(!deets.senior){

      localStorage.setItem('name', deets.name);
      localStorage.setItem('senior', false);
      localStorage.setItem('familyCode', deets.familyCode);
      localStorage.setItem('phone', deets.phone);


      let file = deets.pfp;
      console.log(file)
      const storageRef = ref(storage, 'files/'+file.name)
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
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
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            const obj = {name: deets.name, senior: deets.senior, phone: deets.phone, pfp: downloadURL, familyCode: deets.familyCode}
            sendItUp(obj);
          });

        }
      );
      }
      else{
        localStorage.setItem('senior', true);
      localStorage.setItem('familyCode', deets.familyCode);
        const obj = {senior: deets.senior, familyCode: deets.familyCode}
            sendItUp(obj);
      }
    
  }
  async function sendItUp(deets){
    const res2 = await fetch('/api/createFamily', {
      method: 'POST',
      body: JSON.stringify({ details: deets}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const userData = await res2.json();
  }
  return (
    <div>
        <SetupAccount setDetails = {create}/>
    </div>
  )
}

export default createfamily
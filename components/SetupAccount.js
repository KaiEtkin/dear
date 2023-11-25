import {useState} from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase'
import { useRouter } from 'next/router'

import styles from '../styles/login.module.css'

const SetupAccount = ({setDetails}) => {
    const [senior, setSenior] = useState(true);
    const [familyCode, setFamilyCode] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const router = useRouter()
    function finish(){
      setDetails({name: name, phone: phone, senior:senior, familyCode: familyCode, pfp: selectedImage})
      if(senior){
        router.push('/feed')
        
      }
      else{
        router.push('/post')

      }
    }
   
  return (

    <div className = {styles.contain}>
      <br></br>
      <br></br>

      <h1>Are you a senior?</h1>
      <div className = {styles.senior}>
        <button style = {{backgroundColor: senior ? '#00F0FF' : 'white'}} onClick = {() => setSenior(true)}>Yes</button>
        <button style = {{backgroundColor: !senior ? '#00F0FF' : 'white'}} onClick = {() => setSenior(false)}>No</button>
        </div>
        {!senior && <>
          <br />

            <input type = "text" value = {name} onChange={(e) => setName(e.target.value)} placeholder = "what's your name?"></input>
            <br />
            <input type="tel" id="phone" name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required value = {phone} onChange={(e) => setPhone(e.target.value)} placeholder = "what's your phone number?"></input>
                                <br />

              <h2>Upload a profile picture!</h2>
              <br></br>
              <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            {selectedImage && (
                <div>
                  <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
              )}
      
    
        </>}
        <br />

        <input type = "text" value = {familyCode}  placeholder = "input your family code" onChange={(e) => setFamilyCode(e.target.value)}></input>
       
        <br></br>

        <button className = {styles.finish} onClick = {finish}>Go</button>
    </div>
  )
}

export default SetupAccount
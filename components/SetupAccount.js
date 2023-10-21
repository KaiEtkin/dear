import {useState} from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase'
import { useRouter } from 'next/router'

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

    <div>
        <button style = {{color: senior ? 'red' : 'black'}} onClick = {() => setSenior(true)}>Senior</button>
        <button style = {{color: !senior ? 'red' : 'black'}} onClick = {() => setSenior(false)}>Not a Senior</button>
        {!senior && <>
            <input type = "text" value = {name} onChange={(e) => setName(e.target.value)} placeholder = "what's your name?"></input>
            <input type="tel" id="phone" name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required value = {phone} onChange={(e) => setPhone(e.target.value)} placeholder = "what's your phone number?"></input>
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
        <input type = "text" value = {familyCode}  placeholder = "input your family code" onChange={(e) => setFamilyCode(e.target.value)}></input>
        <button onClick = {finish}>Go</button>
    </div>
  )
}

export default SetupAccount
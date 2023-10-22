import React, {useState, useEffect} from 'react'
import { useSpeechSynthesis,useSpeechRecognition } from 'react-speech-kit';
import styles from '../styles/feed.module.css'

const Post = ({ caption, url, name, pfp}) => {
    const [image, setImage] = useState("image");
    const { speak } = useSpeechSynthesis();
    {/* const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
      onResult: (result) => {
        setValue(result);
      },
    });*/}
    useEffect(() => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'svg'];
        const videoExtensions = ['mp4', 'avi', 'mov'];
      
        const fileExtension = getFileExtension(url);
        console.log(fileExtension)
        if (imageExtensions.includes(fileExtension)) {
            setImage("image")
        } else if (videoExtensions.includes(fileExtension)) {
            setImage("video")
        } 
    }, [])
    
    function getFileExtension(url) {
        const extensionMatch = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
        if (extensionMatch) {
          return extensionMatch[1].toLowerCase();
        }
        return null;
      }
    
  return (
    <div onClick={() => speak({ text: `${name} sent you ${caption}` })} className = {styles.postContainer}>
       {image == "image" && <img src = {url} className = {styles.post}/>}
       {image == "video" && 
       <video width="320" height="240"  className = {styles.post} controls>
          <source src={url} />
        </video>}
        <div className = {styles.details}>
            <img src = {pfp} />
            <h3>{name} sent you "{caption}"</h3>
        </div>
       {/*
        <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      
      <button onMouseDown={listen} onMouseUp={stop}>
        🎤
      </button>
  {listening && <div>Go ahead I'm listening</div>}*/}
    </div>
  )
}

export default Post
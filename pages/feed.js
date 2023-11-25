import React, {useEffect, useState, useRef} from 'react'
import Post from '../components/Post'
import styles from '../styles/feed.module.css'

const feed = () => {
  const [archive, setArchive] = useState([])
  const [today, setToday] = useState([])
  const [members, setMembers] = useState([])
  const [bottom, setBottom] = useState(false);
  const [fontSize, setFontSize] = useState(1) //0 = normal 1 = big 2 = massive
  const [highContrast, setHighContrast] = useState(false)
  const ref = useRef();

  useEffect(()=> {
    init();
  }, [])
  async function init(){
    const res2 = await fetch('/api/getFeed', {
      method: 'POST',
      body: JSON.stringify({ familyCode: localStorage.getItem("familyCode")}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const userData = await res2.json();
    userData.sort(() => Math.random() - 0.5);
    let todayList = []
    let old = []
    for(let i of userData){
      var timestampDate = new Date(i.timestamp);

      // Get the current date
      var currentDate = new Date();
      
      // Compare the year, month, and day of the timestamp with the current date
      var isToday = timestampDate.getFullYear() === currentDate.getFullYear() &&
                    timestampDate.getMonth() === currentDate.getMonth() &&
                    timestampDate.getDate() === currentDate.getDate();
      
      if (isToday) {
      todayList.push(i.data)   
   } else {
       old.push(i.data)
      }   
     }
     setArchive(old);
     setToday(todayList)
    
    console.log(old)
    console.log(todayList);
    const res = await fetch('/api/getFamily', {
      method: 'POST',
      body: JSON.stringify({ familyCode: localStorage.getItem("familyCode")}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const members2 = await res.json();
    console.log(members2)
    setMembers(members2)
  }
  function flip() {
    setBottom(!bottom);
    ref.current.scrollTo(0, 0);

  }

  return (
    <div className = {styles.feed} ref = {ref} style={{ fontSize: `${16 * fontSize}px`, backgroundColor: highContrast ? 'black' : 'inherit' }}>
      {!bottom && 
      
      <div>
        {today.map((post, index) => (
            <div>
            <Post caption = {post.caption} url = {post.file} name = {post.name} pfp = {members.find(item => item.name == `${post.name}`)?.pfp}/>
            <div className = {styles.hr}></div>

            </div>
            
        ))}
        <br></br>
        <h2 className = {styles.h2}>That's it so far for today!</h2>
        <br></br>
        <button 
        onClick = {flip}>See past photos</button>
        <br></br>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <br></br>

      </div>
      }
      
      {bottom && 
      <div>
        <button style = {{ backgroundColor: highContrast ? 'white' : 'inherit', color: highContrast ? 'black' : 'inherit'}}className={styles.backToday} onClick = {flip}>See today's photos</button>

        {archive.map((post, index) => (
            
            <Post caption = {post.caption} url = {post.file} name = {post.name} pfp = {members.find(item => item.name == `${post.name}`)?.pfp} phone = {members.find(item => item.name == `${post.name}`)?.phone}/>
        ))}
       
      </div>
      }
      <div className = {styles.footer}>
        <h3 style = {{fontWeight: '500'}}>Switch To: </h3>
        <div className = {styles.innerFooter}>
        {fontSize == 1 && <h3 onClick = {() => setFontSize(1.5)}>Big Font Size</h3>}
        {fontSize != 1 && <h3 onClick = {() => setFontSize(1)}>Normal Font Size</h3>}

        {highContrast && <h3 onClick = {() => setHighContrast(false)}>Normal Contrast</h3>}
        {!highContrast && <h3 onClick = {() => setHighContrast(true)}>High Contrast</h3>} 
        </div>
        
     </div>
    </div>
  )
}

export default feed
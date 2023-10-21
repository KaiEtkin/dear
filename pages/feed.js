import React, {useEffect, useState} from 'react'
import Post from '../components/Post'

const feed = () => {
  const [archive, setArchive] = useState([])
  const [today, setToday] = useState([])
  const [members, setMembers] = useState([])
  const [bottom, setBottom] = useState(false);
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
  return (
    <div>
      {!bottom && 
      <div>
        {today.map((post, index) => (
          <div key = {index}>
            
            <Post caption = {post.caption} url = {post.file} name = {post.name} pfp = {members.find(item => item.name == `${post.name}`)?.pfp}/>
          </div>
        ))}
        <h2>That's it so far for today!</h2>
        <button onClick = {() => setBottom(true)}>See past photos</button>
      </div>
      }
      {bottom && 
      <div>
        <button onClick = {() => setBottom(false)}>Go back to today's photos</button>

        {archive.map((post, index) => (
          <div key = {index}>
            
            <Post caption = {post.caption} url = {post.file} name = {post.name} pfp = {members.find(item => item.name == `${post.name}`)?.pfp}/>
          </div>
        ))}
       
      </div>
      }
    </div>
  )
}

export default feed
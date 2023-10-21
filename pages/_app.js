import '@component/styles/globals.css'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [good, setGood] = useState(false);
  //add air traffic controller
  //when they are a senior have always available accessibility controls
  useEffect(() => {
    let senior = localStorage.getItem("senior")
    let path = router.pathname;
   
    console.log(senior)
    if(senior == null){
      if(path != "/createfamily" && path != "/"){
        router.push("/")
      }
    }
    else{
      if(senior == "true"){
        if(path != "/feed"){
          router.push("/feed");
        }
      
    }
    else{
      if(path != "/post"){
        router.push("/post")
      }
    }
    }
    setGood(true);
  }, [])
  if(good){
  return <Component {...pageProps} />
  }
  else{
    return <h1>Loading</h1>
  }
}

import {useState} from 'react'
import SetupAccount from '../components/SetupAccount'
    

const createfamily = () => 
{
  async function create(deets){
    console.log(deets)
  }
  return (
    <div>
        <SetupAccount setDetails = {create}/>
    </div>
  )
}

export default createfamily
import React from 'react'

const Post = ({ caption, url, name, pfp}) => {
  return (
    <div>
        <img src = {url} />
        <h3>{caption}</h3>
        <h2>{name}</h2>
        <img src = {pfp} />

    </div>
  )
}

export default Post
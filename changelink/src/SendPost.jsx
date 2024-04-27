import React from 'react'
import { useState } from 'react'

const SendPost = () => {
  const [images, setImages] = useState([])
  const [image, setImage] = useState(null)
  const [music, setMusic] = useState(null)
  const [musicFile, setMusicFile] = useState(null);


  const handleCreatePost = (e) => {
    e.preventDefault()
    console.log('images: ', images)
    console.log('music: ', musicFile)
    fetch('http://localhost:5000/post/createPost', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        images: images,
        description: 'example description',
        music: musicFile
      })
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Помилка:', error));
  }

  const handleSetImages = (e) => {
    if (images.length < 5) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
      setImages(prev => [...prev, reader.result]);
      }
    }
    console.log(images)
  }

  const handleSetMusicFile = (e) => {
    setMusic(e.target.files[0])
    
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setMusicFile(reader.result)
    }
  }
  return (
    <div>
      <form onSubmit={handleCreatePost}>
        images:
        <p/>
        <input type='file' accept="image/png, image/jpeg" onChange={handleSetImages} />
        <p />
        music:
        <p />
        <input type="file" onChange={handleSetMusicFile} />
        <p />
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default SendPost
